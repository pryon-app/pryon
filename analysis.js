

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "");
}

const SCAM_WORDS = {
  odkaz: [
    "http://", "https://", "www.",
    "bit.ly", "tinyurl", "t.co"
  ],

  institucia: [
    "banka", "slovenska posta", "posta",
    "policia", "ministerstvo",
    "socialna poistovna", "poistovna",
    "zdravotna poistovna", "tipos",
    "dopravna policia"
  ],

  citlive_udaje: [
    "heslo", "pin", "cislo karty",
    "udaje karty", "bankove udaje",
    "prihlasovacie udaje",
    "osobne udaje", "overte identitu",
    "potvrdte identitu"
  ],

  naliehavost: [
    "okamzite", "ihned", "urgentne",
    "urgent", "posledna vyzva",
    "do 24 hodin", "do 30 minut",
    "do jednej hodiny",
    "konajte okamzite",
    "posledna pripomienka"
  ],

  platba: [
    "zaplat", "uhrad", "poplatok",
    "nedoplatok", "dlh", "pokuta",
    "clo", "doplat", "na cislo uctu"
  ],

  zasielka: [
    "zasielka", "balik", "doruc",
    "colne konanie"
  ],

  vyhra: [
    "vyhra", "vyhrali", "odmena",
    "bonus", "gratulu",
    "financna cena", "vyzrebovan",
    "zrebovanie"
  ],

  hrozba: [
    "zablok", "deaktiv", "pozastav",
    "zadrzan", "zrusen",
    "odstranen", "nebude doruc",
    "zamraze" , "inak" , "v opacnom pripade"],

  overenie: [
    "overte", "potvrdte",
    "prihlaste sa", "zadajte",
    "doplnte"
  ]
};


const NAMES = {
  odkaz: "Odkaz",
  institucia: "Inštitúcia",
  citlive_udaje: "Citlivé údaje",
  naliehavost: "Naliehavosť / nátlak",
  platba: "Požiadavka na platbu",
  zasielka: "Zásielka / doručenie",
  vyhra: "Výhra / odmena",
  hrozba: "Hrozba / problém",
  overenie: "Požiadavka na overenie"
};


const STEMS = new Set(["zaplat", "uhrad", "doplat", "doruc", "gratulu", "vyzrebovan", "zablok", "deaktiv", "pozastav", "zadrzan", "zrusen", "odstranen", "nebude doruc", "zamraze"]);

function findMatches(sms) {
  let text = "";
  const offsets = [];
  let offset = 0;
  for (const character of sms) {
    const normalized = normalize(character);
    for (let i = 0; i < normalized.length; i++) {
      offsets.push({ start: offset, end: offset + character.length });
    }
    text += normalized;
    offset += character.length;
  }
  const matches = [];
  const isLetter = character => /[\p{L}\p{N}_]/u.test(character || "");
  for (const [category, words] of Object.entries(SCAM_WORDS)) {
    for (const word of words) {
      const keyword = normalize(word);
      let position = text.indexOf(keyword);
      while (position !== -1) {
        const end = position + keyword.length;
        if (category === "odkaz" || (!isLetter(text[position - 1]) && (STEMS.has(word) || !isLetter(text[end])))) {
          matches.push({ category, start: offsets[position].start, end: offsets[end - 1].end });
        }
        position = text.indexOf(keyword, position + 1);
      }
    }
  }
  return matches;
}

function findCategories(sms) {
  return [...new Set(findMatches(sms).map(match => match.category))];
}

function analyzeSMS(sms) {
  const found = findCategories(sms);

  let score = 0;
  const reasons = [];

  if (found.includes("odkaz")) {
    score += 1;
    reasons.push({ text: "Obsahuje odkaz", points: 1 });
  }

  if (found.includes("citlive_udaje")) {
    score += 2;
    reasons.push({ text: "Požaduje alebo spomína citlivé údaje", points: 2 });
  }

  if (found.includes("naliehavost")) {
    score += 1;
    reasons.push({ text: "Vytvára časový nátlak", points: 1 });
  }

  if (found.includes("hrozba")) {
    score += 1;
    reasons.push({ text: "Obsahuje hrozbu alebo problém", points: 1 });
  }

  if (found.includes("vyhra")) {
    score += 1;
    reasons.push({ text: "Sľubuje výhru alebo odmenu", points: 1 });
  }

  if (
    found.includes("platba") &&
    found.includes("odkaz")
  ) {
    score += 2;
    reasons.push({ text: "Požaduje platbu cez odkaz", points: 2 });
  }

  if (
    found.includes("zasielka") &&
    found.includes("platba")
  ) {
    score += 2;
    reasons.push({ text: "Spája zásielku s požiadavkou na platbu", points: 2 });
  }

  if (
    found.includes("zasielka") &&
    found.includes("odkaz")
  ) {
    score += 1;
    reasons.push({ text: "Spája zásielku s odkazom", points: 1 });
  }

  if (
    found.includes("institucia") &&
    found.includes("citlive_udaje")
  ) {
    score += 2;
    reasons.push({ text: "Inštitúcia žiada citlivé údaje", points: 2 });
  }

  if (
    found.includes("institucia") &&
    found.includes("odkaz") &&
    found.includes("overenie")
  ) {
    score += 2;
    reasons.push({ text: "Inštitúcia žiada overenie cez odkaz", points: 2 });
  }

  if (
    found.includes("vyhra") &&
    found.includes("odkaz")
  ) {
    score += 2;
    reasons.push({ text: "Výhra alebo odmena obsahuje odkaz", points: 2 });
  }

  if (
    found.includes("vyhra") &&
    found.includes("citlive_udaje")
  ) {
    score += 2;
    reasons.push({ text: "Výhra alebo odmena žiada citlivé údaje", points: 2 });
  }

  if (
    found.includes("hrozba") &&
    found.includes("naliehavost")
  ) {
    score += 2;
    reasons.push({ text: "Kombinuje hrozbu s nátlakom", points: 2 });
  }

  if (
    found.includes("hrozba") &&
    found.includes("overenie")
  ) {
    score += 1;
    reasons.push({ text: "Po probléme požaduje overenie", points: 1 });
  }

  const result = score >= 4 ? "SCAM" : "LEGIT";

  return {
    result,
    score,
    categories: found,
    reasons
  };
}

