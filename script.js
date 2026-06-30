const PRODUCT_URL =
  "https://teichbedarf-discount.de/AQUA-5-DRY-Hochkonzentrierte-Filterbakterien-Teichbakterien-fuer-Koi-Schwimmteich-Aquarium";

const variants = {
  70: {
    label: "70 g",
    note: "Einstiegsgroesse - ab 21,90 EUR",
    checkout: "Geeignet, wenn Sie erst testen oder ein kleineres System nachdosieren moechten."
  },
  140: {
    label: "140 g",
    note: "Mittelgroesse - finaler Shoppreis",
    checkout: "Solide Wahl fuer regelmaessige Nachdosierung in mittleren Teichsystemen."
  },
  280: {
    label: "280 g",
    note: "Maxi-Dose - bis zu 150.000 l einmalig laut Quelle",
    checkout: "Die groesste Variante fuer grosse Teiche oder planbare Saison-Nachdosierung."
  }
};

const state = {
  selectedVariant: null,
  quantity: 1,
  cartOpen: false,
  checkoutStep: 1
};

const variantButtons = [...document.querySelectorAll("[data-variant]")];
const quantityOutput = document.querySelector("#quantity-output");
const selectionHint = document.querySelector("#selection-hint");
const addToCartButton = document.querySelector("#add-to-cart");
const cartEmpty = document.querySelector("#cart-empty");
const cartContent = document.querySelector("#cart-content");
const cartVariant = document.querySelector("#cart-variant");
const cartNote = document.querySelector("#cart-note");
const cartQuantity = document.querySelector("#cart-quantity");
const checkoutBox = document.querySelector("#checkout-box");
const checkoutPrev = document.querySelector("#checkout-prev");
const checkoutNext = document.querySelector("#checkout-next");
const shopFinal = document.querySelector("#shop-final");
const stepButtons = [...document.querySelectorAll("[data-step]")];

function selectVariant(variantId) {
  state.selectedVariant = variantId;
  state.checkoutStep = 1;
  updateUI();
}

function setQuantity(direction) {
  if (direction === "increase") {
    state.quantity += 1;
  }

  if (direction === "decrease") {
    state.quantity = Math.max(1, state.quantity - 1);
  }

  updateUI();
}

function addToCart() {
  if (!state.selectedVariant) {
    selectionHint.textContent = "Bitte erst einen Inhalt auswaehlen.";
    selectionHint.classList.remove("ready");
    return;
  }

  state.cartOpen = true;
  state.checkoutStep = 1;
  updateUI();
}

function setCheckoutStep(step) {
  state.checkoutStep = Math.min(3, Math.max(1, step));
  updateUI();
}

function updateUI() {
  variantButtons.forEach((button) => {
    const isSelected = button.dataset.variant === state.selectedVariant;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  quantityOutput.textContent = String(state.quantity);

  if (state.selectedVariant) {
    const selected = variants[state.selectedVariant];
    selectionHint.textContent = `${selected.label} gewaehlt. Preis final im Shop.`;
    selectionHint.classList.add("ready");
  }

  cartEmpty.hidden = state.cartOpen;
  cartContent.hidden = !state.cartOpen;

  if (state.cartOpen && state.selectedVariant) {
    const selected = variants[state.selectedVariant];
    cartVariant.textContent = `AQUA-5 DRY ${selected.label}`;
    cartNote.textContent = selected.note;
    cartQuantity.textContent = `${state.quantity}x`;
    checkoutBox.innerHTML = getCheckoutContent(selected);
  }

  stepButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.step) === state.checkoutStep);
  });

  checkoutPrev.hidden = state.checkoutStep === 1;
  checkoutNext.hidden = state.checkoutStep === 3;
  shopFinal.hidden = state.checkoutStep !== 3;
  shopFinal.href = PRODUCT_URL;
}

function getCheckoutContent(selected) {
  if (state.checkoutStep === 1) {
    return `
      <h4>Auswahl bestaetigen</h4>
      <p>${selected.checkout}</p>
      <ul>
        <li>Inhalt: ${selected.label}</li>
        <li>Menge: ${state.quantity}</li>
        <li>Preisbereich: 21,90 bis 59,00 EUR je Dose, final im Shop</li>
      </ul>
    `;
  }

  if (state.checkoutStep === 2) {
    return `
      <h4>Lieferung</h4>
      <p>Die Produktquelle kennzeichnet AQUA-5 DRY als sofort verfuegbar.</p>
      <ul>
        <li>Versandkosten und Lieferadresse werden im Shop berechnet.</li>
        <li>Der finale Warenkorb wird auf teichbedarf-discount.de abgeschlossen.</li>
      </ul>
    `;
  }

  return `
    <h4>Zahlung</h4>
    <p>Der Shop bietet die Zahlungsarten direkt in der echten Kaufabwicklung an.</p>
    <img
      class="payment-strip"
      src="https://teichbedarf-discount.de/mediafiles/Bilder/tb-payments.png"
      alt="Zahlungsarten im Shop"
    >
  `;
}

variantButtons.forEach((button) => {
  button.addEventListener("click", () => selectVariant(button.dataset.variant));
});

document.querySelectorAll("[data-qty]").forEach((button) => {
  button.addEventListener("click", () => setQuantity(button.dataset.qty));
});

addToCartButton.addEventListener("click", addToCart);

checkoutPrev.addEventListener("click", () => setCheckoutStep(state.checkoutStep - 1));
checkoutNext.addEventListener("click", () => setCheckoutStep(state.checkoutStep + 1));

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.cartOpen) {
      setCheckoutStep(Number(button.dataset.step));
    }
  });
});

updateUI();
