const EXAMPLE_SMS = [
  {
    "text": "Vasa banka zaznamenala problem. Okamzite overte identitu a heslo na http://bit.ly/3qJzX7Y. Inak bude ucet zablokovany.",
    "actualType": "SCAM",
    "category": "bank"
  },
  {
    "text": "Ahoj, pridem dnes asi o 15 minut neskor. Vidime sa!",
    "actualType": "LEGIT"
  },
  {
    "text": "Vas balik nebolo mozne dorucit. Uhradte poplatok do 24 hodin na http://bit.ly/5ksHk7Y.",
    "actualType": "SCAM",
    "category": "parcel"
  },
  {
    "text": "Dobry den, pripominam Vam termin stretnutia zajtra o 10:00.",
    "actualType": "LEGIT"
  },
  {
    "text": "Gratulujeme! Vyhrali ste financnu cenu v zrebovani Jackpotu! Potvrdte svoje osobne udaje na https://bit.ly/4DH8ydY.",
    "actualType": "SCAM",
    "category": "prize"
  },
  {
    "text": "Dakujeme za nakup. Vasa objednavka je pripravena na vyzdvihnutie.",
    "actualType": "LEGIT"
  },
  {
    "text": "Posledna pripomienka! Vas bankovy ucet bude zablokovany. Okamzite zadajte heslo.",
    "actualType": "SCAM",
    "category": "bank"
  },
  {
    "text": "Ahoj, nezabudni si zajtra priniest poznamky do skoly.",
    "actualType": "LEGIT"
  },
  {
    "text": "Ministerstvo vnutra zaznamenalo podozrivu aktivitu na vasom ucte. Overte identitu na https://bit.ly/3qJzA7Y do 24 hodin.",
    "actualType": "SCAM"
  },
  {
    "text": "Dopravna policia zaznamenala prekrocenie rychlosti. Uhradte pokutu na https://bit.ly/3qJzX7Y. Konajte okamzite, inak bude pokuta zdvojnasobena!",
    "actualType": "SCAM"
  },
  {
    "text": "Vas balik je pripraveny na vyzdvihnutie. Kod na vyzdvihnutie: 028 485.",
    "actualType": "LEGIT",
    "category": "parcel"
  },
  {
    "text": "Slovenska posta oznamuje, ze vas balik SK-8492-3854-5613 je na ceste. Ocakavajte dorucenie 20.10.2026 do 18:00.",
    "actualType": "LEGIT",
    "category": "parcel"
  },
  {
    "text": "Vasa banka zaznamenala podozrivu aktivitu. Okamzite overte identitu a heslo na https://bit.ly/3qD3X7Y.",
    "actualType": "SCAM",
    "category": "bank"
  },
  {
    "text": "Ahoj, skoc po skole do obchodu a kup prosim mlieko a chlieb dakujem ❤ ",
    "actualType": "LEGIT"
  },
  {
    "text": "Vas ucet bol zablokovany. Okamzite zadajte heslo a pin na https://bit.ly/U6m0K7Y.",
    "actualType": "SCAM",
    "category": "bank"
  },
  {
    "text": "[Zdravotna poistovna UNION] Vase udaje su neaktualne. Overte identitu na https://bit.ly/7eLX7Y.",
    "actualType": "SCAM"
  },
  {
    "text": "Upozornenie na colne konanie: Mate nedoplatok za clo. Uhradte do 30 minut na https://bit.ly/3qJzX7Y, inak bude ucet zablokovany a objednavka zrusena.",
    "actualType": "SCAM",
    "category": "parcel"
  },
  {
    "text": "Dobry den. Dnes je termin vasej pravidelnej preventivne kontroly. Prosime, dostavte sa do ambulancie o 10:00. MuDr. Novakova",
    "actualType": "LEGIT"
  },
  {
    "category": "parcel",
    "actualType": "SCAM",
    "text": "Vasa zasielka bola pozastavena. Doplatte clo cez https://bit.ly/4xK9qW2 do 30 minut."
  },
  {
    "category": "parcel",
    "actualType": "LEGIT",
    "text": "Kurier doruci vas balik dnes medzi 14:00 a 16:00. Kod na prevzatie: 7392."
  },
  {
    "category": "parcel",
    "actualType": "SCAM",
    "text": "Adresa dorucenia je neuplna. Doplnte osobne udaje na https://tinyurl.com/8n4z7q2m."
  },
  {
    "category": "parcel",
    "actualType": "LEGIT",
    "text": "Vasa zasielka je ulozena v boxe. Vyzdvihnite si ju do piatku. Kod: 615804."
  },
  {
    "category": "bank",
    "actualType": "LEGIT",
    "text": "Platba kartou vo vyske 12,50 EUR bola uspesna. Zostatok najdete v aplikacii banky."
  },
  {
    "category": "bank",
    "actualType": "SCAM",
    "text": "Vasa banka: Posledna vyzva! Zadajte pin a heslo na https://bit.ly/3vR8mQ6, inak bude ucet zablokovany."
  },
  {
    "category": "bank",
    "actualType": "LEGIT",
    "text": "Pripominame termin stretnutia na pobocke banky zajtra o 09:30."
  },
  {
    "category": "bank",
    "actualType": "SCAM",
    "text": "Banka zaznamenala neznamy pristup. Overte identitu cez https://tinyurl.com/7w2k9m4x do 24 hodin."
  },
  {
    "category": "prize",
    "actualType": "SCAM",
    "text": "Vyhrali ste novy telefon! Uhradte poplatok a potvrdte udaje karty na https://bit.ly/4bN7zL3."
  },
  {
    "category": "prize",
    "actualType": "LEGIT",
    "text": "Ahoj, gratulujem k vyhre v skolskom turnaji! Zajtra to oslavime."
  },
  {
    "category": "prize",
    "actualType": "SCAM",
    "text": "Caka vas odmena 500 EUR. Zadajte bankove udaje na https://tinyurl.com/9q3v6n8b."
  },
  {
    "category": "prize",
    "actualType": "LEGIT",
    "text": "Vysledky sutaze su na nastenke v skole. Vyhrali sme druhe miesto!"
  }
];

const smsInput = document.getElementById("smsInput");
const charCount = document.getElementById("charCount");

const randomBtn = document.getElementById("randomBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const resetBtn = document.getElementById("resetBtn");

const errorMessage = document.getElementById("errorMessage");
const resultSection = document.getElementById("resultSection");

const resultBanner = document.getElementById("resultBanner");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultIcon = document.getElementById("resultIcon");

const scoreValue = document.getElementById("scoreValue");
const categoriesList = document.getElementById("categoriesList");
const reasonsList = document.getElementById("reasonsList");

const exampleAnswer = document.getElementById("exampleAnswer");
const exampleAnswerText = document.getElementById("exampleAnswerText");

let selectedExample = null;

function updateCharCount() {
  charCount.textContent = `${smsInput.value.length} / 2000`;
}

smsInput.addEventListener("input", () => {
  updateCharCount();

  selectedExample = null;

  smsInput.removeAttribute("aria-invalid");
  errorMessage.hidden = true;
  resultSection.hidden = true;
});

const exampleBags = new Map();
let lastExampleText = "";

function pickExample(category = "all") {
  let bag = exampleBags.get(category);
  if (!bag || bag.length === 0) {
    bag = EXAMPLE_SMS.filter(example => category === "all" || example.category === category);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    exampleBags.set(category, bag);
  }
  const previous = smsInput.value || lastExampleText;
  if (bag.length > 1 && bag[bag.length - 1].text === previous) {
    [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
  }
  const example = bag.pop();
  if (example.text === previous && bag.length === 0) {
    const alternatives = EXAMPLE_SMS.filter(item => (category === "all" || item.category === category) && item.text !== previous);
    if (alternatives.length) {
      bag.push(example);
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    }
  }
  return example;
}

function loadExample(category = "all") {
  selectedExample = pickExample(category);
  lastExampleText = selectedExample.text;
  smsInput.value = selectedExample.text;
  updateCharCount();
  smsInput.removeAttribute("aria-invalid");
  errorMessage.hidden = true;
  resultSection.hidden = true;
  smsInput.focus();
}

function generateRandomSMS() {
  loadExample();
}

randomBtn.addEventListener("click", generateRandomSMS);

function renderMatchedMessage(sms) {
  const preview = document.getElementById("matchedMessage");
  preview.replaceChildren();
  const ranges = findMatches(sms).sort((a, b) => a.start - b.start || b.end - a.end);
  const merged = [];
  for (const range of ranges) {
    const previous = merged[merged.length - 1];
    if (previous && range.start < previous.end) {
      previous.end = Math.max(previous.end, range.end);
      previous.categories.add(NAMES[range.category]);
    } else {
      merged.push({ ...range, categories: new Set([NAMES[range.category]]) });
    }
  }
  let cursor = 0;
  for (const range of merged) {
    preview.appendChild(document.createTextNode(sms.slice(cursor, range.start)));
    const mark = document.createElement("mark");
    mark.textContent = sms.slice(range.start, range.end);
    mark.title = [...range.categories].join(", ");
    preview.appendChild(mark);
    cursor = range.end;
  }
  preview.appendChild(document.createTextNode(sms.slice(cursor)));
}

let analysisCount = 0;

function displayResult(analysis) {
  updateProony(analysis);
  analysisCount++;
  document.getElementById("analysisNumber").textContent = "ANALÝZA #" + String(analysisCount).padStart(2, "0");
  resultSection.hidden = false;

  const isScam = analysis.result === "SCAM";

  resultBanner.className = isScam
    ? "result-banner scam"
    : "result-banner legit";

  resultTitle.textContent = isScam ? "Podozrivá správa" : "Nedostatok podozrivých znakov";

  resultDescription.textContent = isScam
    ? "Algoritmus označil správu ako podozrivú."
    : "Algoritmus nenašiel dostatočné skóre na označenie správy ako podvodnej.";

  resultIcon.textContent = isScam ? "!" : "?";

  scoreValue.textContent = `${analysis.score} bodov`;

  renderMatchedMessage(smsInput.value.trim());
  document.getElementById("resultStatus").textContent = `${resultTitle.textContent}. Skóre: ${analysis.score}. Hranica pre podozrivú správu: 4 body.`;
  resultSection.focus({ preventScroll: true });

  categoriesList.replaceChildren();

  if (analysis.categories.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-text";
    empty.textContent = "Neboli nájdené žiadne sledované znaky.";

    categoriesList.appendChild(empty);
  } else {
    for (const category of analysis.categories) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = NAMES[category];

      categoriesList.appendChild(tag);
    }
  }

  reasonsList.replaceChildren();

  if (analysis.reasons.length === 0) {
    const item = document.createElement("li");

    item.textContent =
      "Neboli splnené žiadne bodované podmienky.";

    reasonsList.appendChild(item);
  } else {
    for (const reason of analysis.reasons) {
      const item = document.createElement("li");
      item.textContent = reason.text;
      const points = document.createElement("strong");
      points.textContent = `+${reason.points}`;
      points.className = "reason-points";
      item.appendChild(points);

      reasonsList.appendChild(item);
    }
  }

  if (selectedExample) {
    exampleAnswer.hidden = false;

    const correct = selectedExample.actualType === analysis.result;

    exampleAnswerText.textContent =
      `Zamýšľaný typ ukážky: ${selectedExample.actualType}. ` +
      (correct
        ? "PryOn ju vyhodnotil rovnako."
        : "PryOn ju vyhodnotil inak.");
  } else {
    exampleAnswer.hidden = true;
  }

  resultSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function handleAnalyze() {
  const sms = smsInput.value.trim();

  if (!sms) {
    errorMessage.hidden = false;
    resultSection.hidden = true;
    smsInput.focus();
    return;
  }

  errorMessage.hidden = true;

  const analysis = analyzeSMS(sms);

  displayResult(analysis);
}

analyzeBtn.addEventListener("click", handleAnalyze);
smsInput.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    handleAnalyze();
  }
});



resetBtn.addEventListener("click", () => {
  smsInput.value = "";
  selectedExample = null;

  updateCharCount();

  errorMessage.hidden = true;
  resultSection.hidden = true;

  smsInput.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

updateCharCount();

document.querySelectorAll("[data-example]").forEach(button => {
  button.addEventListener("click", () => loadExample(button.dataset.example));
});

const proony = document.getElementById("proony");
const proonyToggle = document.getElementById("proonyToggle");
const proonySpeech = document.getElementById("proonySpeech");
const proonyHint = document.getElementById("proonyHint");
proonyToggle.addEventListener("click", () => {
  const open = proonyToggle.getAttribute("aria-expanded") !== "true";
  proonyToggle.setAttribute("aria-expanded", String(open));
  proonySpeech.hidden = !open;
});
function updateProony(analysis) {
  proony.dataset.mood = analysis.result === "SCAM" ? "alert" : "thoughtful";
  if (analysis.result === "SCAM") {
    const strongest = [...analysis.reasons].sort((a, b) => b.points - a.points)[0];
    proonyHint.textContent = "Niečo tu nesedí. " + (strongest ? strongest.text + " (+" + strongest.points + " body). " : "") + "Skontroluj rozpoznané výrazy vo výsledku.";
  } else {
    proonyHint.textContent = "Skóre je pod hranicou 4. To však neznamená, že je správa bezpečná. Niektoré podvody moje pravidlá prehliadnu.";
  }
}
function resetProony() {
  proony.dataset.mood = "curious";
  proonyHint.textContent = "Hľadám podozrivé znaky, ale nie každý podvod odhalím. Vlož SMS a preskúmame ju spolu.";
}
smsInput.addEventListener("input", resetProony);
randomBtn.addEventListener("click", resetProony);
resetBtn.addEventListener("click", resetProony);
document.querySelectorAll("[data-example]").forEach(button => button.addEventListener("click", resetProony));
