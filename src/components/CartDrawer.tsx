"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { CheckoutDetails } from "@/lib/shopify/cart";

const initialDetails: CheckoutDetails = {
  billingName: "",
  rut: "",
  giro: "",
  email: "",
  phone: "",
  billingAddress: "",
  billingCity: "",
  billingRegion: "",
  deliveryMethod: "pickup",
  shippingAddress: "",
  shippingCity: "",
  shippingRegion: "",
  notes: "",
};

const chileRegions = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes",
];

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

function buildCheckoutHref(cartUrl: string) {
  const url = new URL(cartUrl);
  url.searchParams.set(
    "return_to",
    `${window.location.origin}/tienda/gracias`
  );
  return url.toString();
}

function isDetailsValid(details: CheckoutDetails) {
  const requiredBilling =
    details.billingName &&
    details.rut &&
    details.email &&
    details.phone &&
    details.billingAddress &&
    details.billingCity &&
    details.billingRegion;

  if (!requiredBilling) return false;

  if (details.deliveryMethod === "shipping") {
    return Boolean(
      details.shippingAddress &&
        details.shippingCity &&
        details.shippingRegion
    );
  }

  return true;
}

export default function CartDrawer() {
  const {
    isOpen,
    items,
    totalQuantity,
    total,
    currencyCode,
    cartUrl,
    isLoading,
    closeCart,
    updateItem,
    removeItem,
    saveCheckoutDetails,
  } = useCartStore();

  const [step, setStep] = useState<"cart" | "details">("cart");
  const [details, setDetails] = useState<CheckoutDetails>(initialDetails);
  const [error, setError] = useState("");

  const updateDetails = (
    field: keyof CheckoutDetails,
    value: CheckoutDetails[keyof CheckoutDetails]
  ) => {
    setDetails((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const goToCheckout = async () => {
    if (!cartUrl) return;

    if (!isDetailsValid(details)) {
      setError("Completa los datos obligatorios antes de continuar al pago.");
      return;
    }

    await saveCheckoutDetails(details);
    window.location.href = buildCheckoutHref(cartUrl);
  };

  const closeAndReset = () => {
    setStep("cart");
    closeCart();
  };

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? " open" : ""}`}
        onClick={closeAndReset}
      />

      <aside className={`cart-drawer${isOpen ? " open" : ""}`}>
        <div className="cart-head">
          <span className="cart-title">
            {step === "cart" ? "Carrito" : "Datos de compra"}
            {totalQuantity > 0 && (
              <span className="cart-count">{totalQuantity}</span>
            )}
          </span>

          <button
            className="cart-close"
            onClick={closeAndReset}
            aria-label="Cerrar carrito"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg className="cart-empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p>El carrito está vacío</p>
          </div>
        ) : step === "cart" ? (
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.lineId} className="cart-item">
                <div className="cart-item-img">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? item.productTitle}
                    />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity=".4">
                      <rect x="3" y="3" width="18" height="18" rx="1" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  )}
                </div>

                <div className="cart-item-body">
                  <span className="cart-item-name">{item.productTitle}</span>
                  {item.title !== "Default Title" && (
                    <span className="cart-item-variant">{item.title}</span>
                  )}

                  <div className="cart-item-foot">
                    <span className="cart-item-price">
                      {formatPrice(item.price, item.currencyCode)}
                      <small>IVA incluido</small>
                    </span>

                    <div className="cart-qty">
                      <button
                        className="cart-qty-btn"
                        disabled={isLoading}
                        onClick={() =>
                          item.quantity > 1
                            ? updateItem(item.lineId, item.quantity - 1)
                            : removeItem(item.lineId)
                        }
                      >
                        −
                      </button>
                      <span className="cart-qty-num">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        disabled={isLoading}
                        onClick={() => updateItem(item.lineId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="cart-item-remove"
                    disabled={isLoading}
                    onClick={() => removeItem(item.lineId)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <form className="checkout-form" onSubmit={(event) => event.preventDefault()}>
            <p className="checkout-help">
              Confirma los datos de facturación y entrega. El despacho a
              regiones de Chile se coordina con plazo de hasta 3 días hábiles.
            </p>

            <label>
              Razón social o nombre *
              <input
                value={details.billingName}
                onChange={(event) => updateDetails("billingName", event.target.value)}
              />
            </label>

            <div className="checkout-row">
              <label>
                RUT *
                <input
                  value={details.rut}
                  onChange={(event) => updateDetails("rut", event.target.value)}
                />
              </label>
              <label>
                Giro
                <input
                  value={details.giro}
                  onChange={(event) => updateDetails("giro", event.target.value)}
                />
              </label>
            </div>

            <div className="checkout-row">
              <label>
                Email *
                <input
                  type="email"
                  value={details.email}
                  onChange={(event) => updateDetails("email", event.target.value)}
                />
              </label>
              <label>
                Teléfono *
                <input
                  value={details.phone}
                  onChange={(event) => updateDetails("phone", event.target.value)}
                />
              </label>
            </div>

            <label>
              Dirección de facturación *
              <input
                value={details.billingAddress}
                onChange={(event) => updateDetails("billingAddress", event.target.value)}
              />
            </label>

            <div className="checkout-row">
              <label>
                Comuna *
                <input
                  value={details.billingCity}
                  onChange={(event) => updateDetails("billingCity", event.target.value)}
                />
              </label>
              <label>
                Región *
                <select
                  value={details.billingRegion}
                  onChange={(event) => updateDetails("billingRegion", event.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {chileRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="checkout-methods">
              <button
                type="button"
                className={details.deliveryMethod === "pickup" ? "active" : ""}
                onClick={() => updateDetails("deliveryMethod", "pickup")}
              >
                Retiro en bodega
              </button>
              <button
                type="button"
                className={details.deliveryMethod === "shipping" ? "active" : ""}
                onClick={() => updateDetails("deliveryMethod", "shipping")}
              >
                Despacho a región
              </button>
            </div>

            {details.deliveryMethod === "shipping" && (
              <>
                <p className="checkout-help">
                  Despacho disponible a cualquier región de Chile. Plazo
                  informado: hasta 3 días hábiles.
                </p>
                <label>
                  Dirección de despacho *
                  <input
                    value={details.shippingAddress}
                    onChange={(event) => updateDetails("shippingAddress", event.target.value)}
                  />
                </label>
                <div className="checkout-row">
                  <label>
                    Comuna despacho *
                    <input
                      value={details.shippingCity}
                      onChange={(event) => updateDetails("shippingCity", event.target.value)}
                    />
                  </label>
                  <label>
                    Región despacho *
                    <select
                      value={details.shippingRegion}
                      onChange={(event) => updateDetails("shippingRegion", event.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      {chileRegions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </>
            )}

            <label>
              Notas adicionales
              <textarea
                value={details.notes}
                onChange={(event) => updateDetails("notes", event.target.value)}
                rows={3}
              />
            </label>

            {error && <p className="checkout-error">{error}</p>}
          </form>
        )}

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span className="cart-total-lbl">Total</span>
              <span className="cart-total-val">
                {formatPrice(total, currencyCode)}
                <small>IVA incluido</small>
              </span>
            </div>

            {step === "cart" ? (
              <button
                type="button"
                className={`cart-checkout${!cartUrl ? " disabled" : ""}`}
                disabled={!cartUrl}
                onClick={() => setStep("details")}
              >
                Continuar
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </button>
            ) : (
              <div className="checkout-actions">
                <button
                  type="button"
                  className="cart-back"
                  onClick={() => setStep("cart")}
                >
                  Volver
                </button>
                <button
                  type="button"
                  className={`cart-checkout${!cartUrl ? " disabled" : ""}`}
                  disabled={!cartUrl || isLoading}
                  onClick={goToCheckout}
                >
                  {isLoading ? "Guardando..." : "Ir a Pagar"}
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
