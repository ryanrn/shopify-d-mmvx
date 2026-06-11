/**
 * DØMMVX Product Details Section
 * Design: Brutalismo Espacial — informação como ornamento
 * Agora conectado ao Shopify (Storefront API via tRPC commerce.*)
 */

import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/lib/money";
import type { Product } from "@shared/commerce/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const PRODUCT_HANDLE = "dommvx-jaqueta-vinho-drop-001";

const STATIC_SPECS = [
  { label: "MATERIAL", value: "COURO ITALIANO FULL-GRAIN" },
  { label: "COR", value: "VINHO PROFUNDO", hasColor: true },
  { label: "SILHUETA", value: "OVERSIZED STRUCTURED" },
  { label: "FORRO", value: "SEDA PURA — PRETO" },
  { label: "PRODUÇÃO", value: "50 UNIDADES — NUMERADAS" },
];

export default function ProductDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addItem, loading: cartLoading } = useCart();

  const {
    data: product,
    isLoading,
    isError,
  } = trpc.commerce.products.byHandle.useQuery({
    handle: PRODUCT_HANDLE,
  });

  const productUnavailable = isError || (!isLoading && !product);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  // Selecionar a primeira variante disponível por padrão
  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariantId) {
      const firstAvailable =
        product.variants.find((v) => v.availableForSale) ?? product.variants[0];
      setSelectedVariantId(firstAvailable.id);
    }
  }, [product, selectedVariantId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product, selectedVariantId]
  );

  const mainImage = product?.images?.[0]?.url;
  const detailImage = product?.images?.[1]?.url ?? product?.images?.[0]?.url;

  const priceMoney = selectedVariant?.price ?? product?.priceRange.min;

  const handleAddToCart = async () => {
    if (!selectedVariantId) {
      toast("Selecione um tamanho antes de continuar.");
      return;
    }
    try {
      await addItem(selectedVariantId, 1);
    } catch {
      toast("Não foi possível adicionar à sacola. Tente novamente.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="produto"
      className="relative w-full min-h-screen py-24 lg:py-32 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="absolute top-0 left-6 right-6 lg:left-16 lg:right-16 h-px bg-white/[0.04]" />

      {/* Section Header */}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#5C1A1A]" />
          <span
            className="text-white/25 text-[9px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            DETALHES DO PRODUTO
          </span>
        </div>
        <h2
          className="text-[#F5F5F5] tracking-[0.05em] uppercase mb-16 lg:mb-24"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: "0.9",
          }}
        >
          JAQUETA<br />VINHO
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">
        {/* Left — Specs */}
        <div
          className="lg:col-span-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s",
          }}
        >
          <div className="space-y-8">
            {STATIC_SPECS.map((spec) => (
              <div key={spec.label}>
                <span
                  className="text-white/20 text-[9px] tracking-[0.3em] uppercase block mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {spec.label}
                </span>
                <div className="flex items-center gap-3">
                  {spec.hasColor && <div className="w-3 h-3 bg-[#5C1A1A]" />}
                  <span
                    className="text-[#F5F5F5]/60 text-[11px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center — Main Image */}
        <div
          className="lg:col-span-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s",
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden group bg-[#171717]">
            {mainImage && (
              <img
                src={mainImage}
                alt={product?.images?.[0]?.altText ?? "DØMMVX Jaqueta Vinho"}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-white/[0.08]" />
            <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-white/[0.08]" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-white/[0.08]" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-white/[0.08]" />
          </div>
        </div>

        {/* Right — Detail + Buy */}
        <div
          className="lg:col-span-4 flex flex-col gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.6s",
          }}
        >
          <div className="relative aspect-[16/10] overflow-hidden group bg-[#171717]">
            {detailImage && (
              <img
                src={detailImage}
                alt="DØMMVX Jaqueta Vinho — Detalhe"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/20 via-transparent to-transparent" />
          </div>

          {/* Price Block */}
          <div className="mt-auto pt-8 border-t border-white/[0.06]">
            <span
              className="text-white/20 text-[9px] tracking-[0.3em] uppercase block mb-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              INVESTIMENTO
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className="text-[#F5F5F5] text-3xl lg:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isLoading || !priceMoney ? "—" : formatPrice(priceMoney)}
              </span>
            </div>
            <p
              className="mt-2 text-white/25 text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              EM ATÉ 12X SEM JUROS
            </p>

            {/* Size Selection — variantes reais */}
            <div className="mt-8">
              <span
                className="text-white/20 text-[9px] tracking-[0.3em] uppercase block mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                TAMANHO
              </span>
              <div className="flex flex-wrap gap-2">
                {isLoading || !product
                  ? ["P", "M", "G", "GG"].map((s) => (
                      <div
                        key={s}
                        className="w-10 h-10 border border-white/[0.06] animate-pulse"
                      />
                    ))
                  : product.variants.map((variant) => {
                      const label = variantLabel(variant, product);
                      const active = variant.id === selectedVariantId;
                      const disabled = !variant.availableForSale;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantId(variant.id)}
                          disabled={disabled}
                          className={[
                            "min-w-10 h-10 px-3 border text-[10px] tracking-[0.15em] transition-all duration-300 active:scale-95",
                            active
                              ? "border-[#F5F5F5] text-[#0A0A0A] bg-[#F5F5F5]"
                              : "border-white/[0.08] text-[#F5F5F5]/50 hover:border-white/30 hover:text-[#F5F5F5]",
                            disabled
                              ? "opacity-25 line-through cursor-not-allowed hover:border-white/[0.08]"
                              : "",
                          ].join(" ")}
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {label}
                        </button>
                      );
                    })}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading || cartLoading || !selectedVariantId || productUnavailable}
              className="mt-8 w-full py-4 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {productUnavailable
                ? "INDISPONÍVEL"
                : cartLoading
                  ? "ADICIONANDO..."
                  : "ADICIONAR À SACOLA"}
            </button>
            {productUnavailable && (
              <p
                className="mt-4 text-[#5C1A1A] text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                PRODUTO INDISPONÍVEL NO MOMENTO
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Extrai o label de tamanho da variante (ex.: "M") ou usa o título. */
function variantLabel(
  variant: Product["variants"][number],
  product: Product
): string {
  const sizeOption = product.options.find(
    (o) => o.name.toLowerCase() === "tamanho" || o.name.toLowerCase() === "size"
  );
  if (sizeOption) {
    const selected = variant.selectedOptions.find(
      (s) => s.name.toLowerCase() === sizeOption.name.toLowerCase()
    );
    if (selected) return selected.value;
  }
  return variant.title;
}
