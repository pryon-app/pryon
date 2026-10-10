const QUIZ_EXAMPLES = [
  {
    "text": "Ahoj mami, mam nove cislo. Rozbil sa mi telefon. Posli mi prosim 300 eur na tento ucet, vecer ti vsetko vysvetlim.",
    "actualType": "SCAM",
    "explanation": "Podvodník sa v tejto ukážke vydáva za príbuzného a žiada peniaze. Pravidlá tento scenár prehliadnu."
  },
  {
    "text": "Vas balik nebolo mozne dorucit. Uhradte poplatok do 24 hodin na https://bit.ly/30XKXOl2c.",
    "actualType": "SCAM",
    "explanation": "Zásielka, platba cez odkaz a časový nátlak spúšťajú viacero pravidiel."
  },
  {
    "text": "Ahoj, pridem dnes o 15 minut neskor. Pockaj ma prosim pred skolou.",
    "actualType": "LEGIT",
    "explanation": "Vymyslená správa je bežné dohodnutie stretnutia. Nízke skóre samo osebe nepotvrdzuje bezpečnosť skutočných správ."
  },
  {
    "text": "Vasa banka: Okamzite zadajte heslo na https://tinyurl.9kL0Wmk.com, inak bude ucet zablokovany.",
    "actualType": "SCAM",
    "explanation": "Žiadosť o heslo cez odkaz, hrozba a naliehavosť vytvárajú vysoké skóre."
  },
  {
    "text": "Na skoleni si ukazeme podvodnu SMS: banka ziada heslo, hrozi zablokovanim a prikazuje konat okamzite. Je to iba priklad, na nic neodpovedajte.",
    "actualType": "LEGIT",
    "explanation": "Vzdelávacia správa cituje znaky podvodu. Algoritmus nerozumie kontextu a nesprávne ju označí ako podozrivú."
  },
  {
    "text": "Vas balik je pripraveny na vyzdvihnutie. Kod: 028 485.",
    "actualType": "LEGIT",
    "explanation": "Samotná zmienka o zásielke nepridáva body. Táto ukážka je bežné oznámenie."
  }
];

const quizMessage = document.getElementById("quizMessage");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext = document.getElementById("quizNext");
const quizButtons = [...document.querySelectorAll("[data-guess]")];
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = 0;
let quizLocked = false;
let quizOutcomes = [];
function showQuizRound() {
  quizLocked = false;
  renderQuizTrack();
  quizMessage.textContent = QUIZ_EXAMPLES[quizIndex].text;
  document.getElementById("quizProgress").textContent = "Ukážka " + (quizIndex + 1) + " / " + QUIZ_EXAMPLES.length + " · Správne odpovede: " + quizCorrect + " / " + quizAnswered;
  quizFeedback.replaceChildren();
  document.getElementById("quizChallenge").replaceChildren();
  quizNext.hidden = true;
  quizButtons.forEach(button => { button.disabled = false; });
}
function answerQuiz(guess) {
  if (quizLocked) return;
  quizLocked = true;
  const example = QUIZ_EXAMPLES[quizIndex];
  const analysis = analyzeSMS(example.text);
  const correct = guess === example.actualType;
  quizAnswered++;
  if (correct) quizCorrect++;
  quizOutcomes[quizIndex] = correct;
  renderQuizTrack();
  quizButtons.forEach(button => { button.disabled = true; });
  document.getElementById("quizProgress").textContent = "Ukážka " + (quizIndex + 1) + " / " + QUIZ_EXAMPLES.length + " · Správne odpovede: " + quizCorrect + " / " + quizAnswered;
  const heading = document.createElement("strong");
  heading.textContent = correct ? "Správny odhad!" : "Táto ukážka ťa prekvapila.";
  const comparison = document.createElement("p");
  comparison.textContent = "Zamýšľaný typ: " + (example.actualType === "SCAM" ? "podvodná" : "legitímna") + ". PryOn: " + (analysis.result === "SCAM" ? "podozrivá správa" : "nedostatok podozrivých znakov") + " (skóre " + analysis.score + ", hranica 4). " + (analysis.result === example.actualType ? "Algoritmus sa zhodol so zamýšľaným typom." : "Algoritmus sa so zamýšľaným typom nezhodol.");
  const explanation = document.createElement("p");
  explanation.textContent = example.explanation;
  quizFeedback.replaceChildren(heading, comparison, explanation);
  document.getElementById("quizChallenge").replaceChildren(createEditingChallenge(example));
  quizNext.textContent = quizIndex === QUIZ_EXAMPLES.length - 1 ? "Skúsiť znova ↻" : "Ďalšia ukážka →";
  quizNext.hidden = false;
  quizNext.focus({ preventScroll: true });
}
quizButtons.forEach(button => button.addEventListener("click", () => answerQuiz(button.dataset.guess)));
quizNext.addEventListener("click", () => {
  quizIndex++;
  if (quizIndex === QUIZ_EXAMPLES.length) {
    quizIndex = 0;
    quizCorrect = 0;
    quizAnswered = 0;
    quizOutcomes = [];
  }
  showQuizRound();
  quizButtons[0].focus({ preventScroll: true });
});
showQuizRound();

function createEditingChallenge(example) {
  const panel = document.createElement("details");
  panel.className = "editing-challenge";
  const toggle = document.createElement("summary");
  toggle.textContent = "✎ Skús zmeniť rozhodnutie";
  const body = document.createElement("div");
  body.className = "challenge-body";
  const original = analyzeSMS(example.text);
  const target = document.createElement("p");
  target.className = "challenge-target";
  target.textContent = original.score >= 4 ? "Tvoj cieľ: dostaň skóre pod 4." : "Tvoj cieľ: dosiahni aspoň 4 body.";
  const label = document.createElement("label");
  label.htmlFor = "challengeInput";
  label.className = "sr-only";
  label.textContent = "Uprav ukážkovú SMS";
  const input = document.createElement("textarea");
  input.id = "challengeInput";
  input.maxLength = 2000;
  input.value = example.text;
  input.setAttribute("aria-describedby", "challengeNote");
  const dashboard = document.createElement("div");
  dashboard.className = "challenge-dashboard";
  const score = document.createElement("strong");
  const status = document.createElement("span");
  dashboard.setAttribute("role", "status");
  dashboard.setAttribute("aria-live", "polite");
  dashboard.append(score, status);
  const breakdown = document.createElement("details");
  breakdown.className = "challenge-breakdown";
  const breakdownToggle = document.createElement("summary");
  breakdownToggle.textContent = "Čo pridáva body?";
  const reasons = document.createElement("ul");
  breakdown.append(breakdownToggle, reasons);
  const footer = document.createElement("div");
  footer.className = "challenge-footer";
  const note = document.createElement("small");
  note.id = "challengeNote";
  note.textContent = "Len experiment · nemení skóre kvízu ani bezpečnosť správy.";
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "challenge-reset";
  reset.textContent = "↺ Obnoviť";
  function update() {
    const text = input.value.trim();
    const analysis = analyzeSMS(text);
    score.textContent = text ? analysis.score + " bodov" : "—";
    status.textContent = !text ? "Napíš správu" : analysis.result !== original.result ? "Cieľ splnený!" : analysis.score >= 4 ? "Podozrivá · hranica 4" : "Pod hranicou 4";
    dashboard.dataset.changed = String(Boolean(text) && analysis.result !== original.result);
    reasons.replaceChildren();
    const entries = analysis.reasons.length ? analysis.reasons.map(reason => reason.text + " (+" + reason.points + ")") : ["Žiadne bodované pravidlá."];
    for (const entry of entries) {
      const item = document.createElement("li");
      item.textContent = entry;
      reasons.appendChild(item);
    }
  }
  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(update, 180);
  });
  reset.addEventListener("click", () => {
    clearTimeout(timer);
    input.value = example.text;
    update();
    input.focus();
  });
  footer.append(note, reset);
  body.append(target, label, input, dashboard, breakdown, footer);
  panel.append(toggle, body);
  update();
  return panel;
}

function renderQuizTrack() {
  const track = document.getElementById("quizTrack");
  track.replaceChildren();
  for (let i = 0; i < QUIZ_EXAMPLES.length; i++) {
    const tile = document.createElement("li");
    const answered = typeof quizOutcomes[i] === "boolean";
    tile.className = answered ? quizOutcomes[i] ? "track-correct" : "track-incorrect" : i === quizIndex ? "track-current" : "";
    tile.textContent = answered ? quizOutcomes[i] ? "✓" : "×" : String(i + 1).padStart(2, "0");
    tile.setAttribute("aria-label", "Otázka " + (i + 1) + ": " + (answered ? quizOutcomes[i] ? "správny odhad" : "nesprávny odhad" : i === quizIndex ? "aktuálna" : "nezodpovedaná"));
    if (i === quizIndex) tile.setAttribute("aria-current", "step");
    track.appendChild(tile);
  }
}
