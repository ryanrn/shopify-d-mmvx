/**
 * DØMMVX Cart Drawer
 * Design: Brutalismo Espacial — painel lateral monolítico, tipografia mono,
 * zero border-radius, contraste extremo. Consome o estado de useCart().
 */

import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/money";
import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    loading,
    itemCount,
    closeCart,
    updateQuantity,
    removeItem,
    proceedToCheckout,
  } = useCart();

  // Bloquear scroll do body quando aberto
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px]"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 z-[101] h-full w-full sm:w-[440px] flex flex-col"
        style={{
          backgroundColor: "#0A0A0A",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-7 border-b border-white/[0.06]">
          <div className="flex items-baseline gap-3">
            <span
              className="text-[#F5F5F5] text-[11px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SACOLA
            </span>
            <span
              className="text-white/30 text-[10px] tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [{String(itemCount).padStart(2, "0")}]
            </span>
          </div>
          <button
            onClick={closeCart}
            className="text-white/40 hover:text-[#F5F5F5] transition-colors duration-300 active:scale-90"
            aria-label="Fechar sacola"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {!cart || cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-8 text-center">
              <span
                className="text-white/20 text-[9px] tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SUA SACOLA ESTÁ VAZIA
              </span>
              <div className="w-8 h-px bg-[#5C1A1A] mt-6" />
            </div>
          ) : (
            <div className="divide-y divide-white/[0.05]">
              {cart.items.map((item) => {
                const maxQuantity = item.quantityAvailable ?? 10;
                const isAtStockLimit = item.quantityAvailable !== null && item.quantity >= item.quantityAvailable;
                const isAtCartLimit = item.quantityAvailable === null && item.quantity >= 10;
                const disableIncrease = loading || isAtStockLimit || isAtCartLimit;
                const increaseTitle = isAtStockLimit
                  ? "Quantidade máxima disponível em estoque"
                  : isAtCartLimit
                    ? "Limite de 10 unidades por item"
                    : undefined;

                return (
                <div key={item.lineId} className="flex gap-4 px-7 py-6">
                  {/* Image */}
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-[#171717]">
                    {item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.image.altText ?? item.productTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span
                      className="text-[#F5F5F5] text-[11px] tracking-[0.12em] uppercase leading-tight"
                      style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                    >
                      {item.productTitle}
                    </span>
                    <span
                      className="mt-1 text-white/35 text-[9px] tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.variantTitle}
                    </span>

                    {/* Qty controls */}
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="flex items-center border border-white/[0.1]">
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-[#F5F5F5] transition-colors disabled:opacity-30"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={11} strokeWidth={2} />
                        </button>
                        <span
                          className="w-7 text-center text-[#F5F5F5] text-[10px]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            if (item.quantity < maxQuantity) {
                              updateQuantity(item.lineId, item.quantity + 1);
                            }
                          }}
                          disabled={disableIncrease}
                          className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-[#F5F5F5] transition-colors disabled:opacity-30"
                          aria-label="Aumentar quantidade"
                          title={increaseTitle}
                        >
                          <Plus size={11} strokeWidth={2} />
                        </button>
                      </div>
                      <span
                        className="text-[#F5F5F5]/80 text-[11px]"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {formatPrice(item.lineTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.lineId)}
                    disabled={loading}
                    className="self-start text-white/25 hover:text-[#5C1A1A] transition-colors duration-300 disabled:opacity-30"
                    aria-label="Remover item"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="border-t border-white/[0.06] px-7 py-7">
            <div className="flex items-baseline justify-between mb-6">
              <span
                className="text-white/30 text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                SUBTOTAL
              </span>
              <span
                className="text-[#F5F5F5] text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatPrice(cart.subtotal)}
              </span>
            </div>
            <button
              onClick={proceedToCheckout}
              disabled={loading}
              className="w-full py-4 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white active:scale-[0.98] disabled:opacity-50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {loading ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
            </button>
            <p
              className="mt-4 text-center text-white/20 text-[8px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FRETE E IMPOSTOS CALCULADOS NO CHECKOUT
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
