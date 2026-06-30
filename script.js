const DOSE_PER_LITER = 280 / 150000;
const PACK_SIZES = [280, 140, 70];

const volumeInput = document.querySelector("#pond-volume");
const modeInputs = [...document.querySelectorAll("input[name='dose-mode']")];
const requiredGrams = document.querySelector("#required-grams");
const doseSummary = document.querySelector("#dose-summary");
const recommendationTitle = document.querySelector("#recommendation-title");
const recommendationCopy = document.querySelector("#recommendation-copy");
const packageList = document.querySelector("#package-list");
const stickyCta = document.querySelector(".sticky-cta");
const buySection = document.querySelector("#kaufen");

function getSelectedMode() {
  return modeInputs.find((input) => input.checked)?.value || "regular";
}

function calculateDose() {
  const volume = Math.max(0, Number(volumeInput.value) || 0);
  const mode = getSelectedMode();
  const factor = mode === "start" ? 2 : 1;
  const grams = Math.ceil(volume * DOSE_PER_LITER * factor);
  const recommendation = recommendPackages(grams);

  requiredGrams.textContent = `${formatNumber(grams)} g`;
  doseSummary.textContent = getDoseSummary(volume, mode);
  recommendationTitle.textContent = recommendation.title;
  recommendationCopy.textContent = recommendation.copy;
  packageList.innerHTML = recommendation.items.map((item) => `<li>${item}</li>`).join("");
}

function recommendPackages(grams) {
  if (grams <= 0) {
    return {
      title: "Teichvolumen eingeben",
      copy: "Gib dein Teichvolumen ein, dann erscheint hier die passende Shop-Empfehlung.",
      items: ["Teichvolumen in Litern eintragen"]
    };
  }

  let best = null;
  const maxCans = Math.max(8, Math.ceil(grams / 70) + 2);

  for (let count280 = 0; count280 <= maxCans; count280 += 1) {
    for (let count140 = 0; count140 <= maxCans; count140 += 1) {
      for (let count70 = 0; count70 <= maxCans; count70 += 1) {
        const total = count280 * 280 + count140 * 140 + count70 * 70;
        const cans = count280 + count140 + count70;

        if (total < grams || cans === 0) {
          continue;
        }

        const candidate = { count280, count140, count70, total, cans };
        if (!best || total < best.total || (total === best.total && cans < best.cans)) {
          best = candidate;
        }
      }
    }
  }

  const parts = [
    { count: best.count280, size: 280 },
    { count: best.count140, size: 140 },
    { count: best.count70, size: 70 }
  ].filter((part) => part.count > 0);

  const items = parts.map((part) => `${part.count}x ${part.size} g`);
  const title = `${items.join(" + ")} empfohlen`;
  const reserve = best.total - grams;
  const reserveText = reserve > 0 ? ` Das lässt ca. ${formatNumber(reserve)} g Reserve.` : "";

  return {
    title,
    copy: `Im Shop ${items.join(" plus ")} auswählen. Gesamtmenge: ${formatNumber(best.total)} g.${reserveText}`,
    items
  };
}

function getDoseSummary(volume, mode) {
  if (volume <= 0) {
    return "Für die Berechnung wird dein Teichvolumen in Litern benötigt.";
  }

  const modeText =
    mode === "start"
      ? "Filterstart oder einen stark belasteten Teich mit doppelter Dosis"
      : "regelmäßige Nachdosierung";

  return `Berechnet für ${formatNumber(volume)} Liter und ${modeText}.`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("de-DE").format(value);
}

function updateStickyCta() {
  if (!stickyCta) {
    return;
  }

  const buyRect = buySection?.getBoundingClientRect();
  const buySectionVisible =
    buyRect && buyRect.top < window.innerHeight && buyRect.bottom > 0;

  stickyCta.classList.toggle("is-visible", window.scrollY > 280 && !buySectionVisible);
}

volumeInput.addEventListener("input", calculateDose);
modeInputs.forEach((input) => input.addEventListener("change", calculateDose));
window.addEventListener("scroll", updateStickyCta, { passive: true });
window.addEventListener("resize", updateStickyCta);

calculateDose();
updateStickyCta();
