"use client";
import { useCartStore } from "@/store/cart";

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default function CartDrawer() {
  const { isOpen, items, totalQuantity, total, currencyCode, cartUrl, isLoading, closeCart, updateItem, removeItem } =
    useCartStore();

  const checkoutHref = cartUrl
    ? `${cartUrl}?return_to=${encodeURIComponent(
        (typeof window !== "undefined" ? window.location.origin : "") + "/tienda/gracias"
      )}`
    : "#";

  return (
    <>
      <div className={`cart-overlay${isOpen ? " open" : ""}`} onClick={closeCart} />

      <aside className={`cart-drawer${isOpen ? " open" : ""}`}>
        {/* Header */}
        <div className="cart-head">
          <span className="cart-title">
            Carrito
            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
          </span>
          <button className="cart-close" onClick={closeCart} aria-label="Cerrar carrito">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <svg className="cart-empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p>El carrito está vacío</p>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.lineId} className="cart-item">
                <div className="cart-item-img">
                  {item.image ? (
                    <img src={item.image} alt={item.imageAlt ?? item.productTitle} />
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
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total">
              <span className="cart-total-lbl">Total</span>
              <span className="cart-total-val">{formatPrice(total, currencyCode)}</span>
            </div>
            <a
              href={checkoutHref}
              className={`cart-checkout${!cartUrl ? " disabled" : ""}`}
            >
              Ir a pagar
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
