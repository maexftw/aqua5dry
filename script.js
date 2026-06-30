const variants = {
  70: {
    title: "70 g ausgewählt",
    hint: "70 g ist eine sinnvolle Einstiegsgröße für kleinere Systeme oder zum Nachdosieren.",
    card: "Einstiegsgröße für kleinere Systeme. Menge und finaler Preis werden im Shop gewählt."
  },
  140: {
    title: "140 g ausgewählt",
    hint: "140 g ist die mittlere Größe für regelmäßige Nachdosierung.",
    card: "Mittelgröße für regelmäßige Nachdosierung. Die Anzahl legst du direkt im Shop fest."
  },
  280: {
    title: "280 g ausgewählt",
    hint: "280 g ist die Maxi-Dose; laut Quelle reicht sie für bis zu 150.000 Liter einmalig.",
    card: "Maxi-Dose für große Teiche oder planbare Saison-Nachdosierung. Für mehr Bedarf mehrere Dosen im Shop wählen."
  }
};

const variantButtons = [...document.querySelectorAll("[data-variant]")];
const selectionHint = document.querySelector("#selection-hint");
const recommendationTitle = document.querySelector("#recommendation-title");
const recommendationCopy = document.querySelector("#recommendation-copy");
const stickyCta = document.querySelector(".sticky-cta");

function selectVariant(variantId) {
  const selected = variants[variantId];

  variantButtons.forEach((button) => {
    const isSelected = button.dataset.variant === variantId;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  selectionHint.textContent = selected.hint;
  selectionHint.classList.add("ready");
  recommendationTitle.textContent = selected.title;
  recommendationCopy.textContent = selected.card;
}

function updateStickyCta() {
  if (!stickyCta) {
    return;
  }

  stickyCta.classList.toggle("is-visible", window.scrollY > 280);
}

variantButtons.forEach((button) => {
  button.addEventListener("click", () => selectVariant(button.dataset.variant));
});

window.addEventListener("scroll", updateStickyCta, { passive: true });

updateStickyCta();
