/**
 * DØMMVX Product Details Section
 * Design: Brutalismo Espacial — informação como ornamento
 * Grid rígido, tipografia monospace, espaço negativo extremo
 */

import { useEffect, useRef, useState } from "react";

const DETAIL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663137495765/8bdmdadQ43ueUq4uRA5LzB/dommvx-jacket-detail-X665VAdtZrn8tkN3spG2it.webp";
const JACKET_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663137495765/8bdmdadQ43ueUq4uRA5LzB/dommvx-jacket-hero-SXiXewszXRDncoH6vweeyr.webp";

export default function ProductDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 lg:py-32 px-6 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Horizontal divider top */}
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
        {/* Left Column — Specs */}
        <div
          className="lg:col-span-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.2s",
          }}
        >
          <div className="space-y-8">
            {[
              { label: "MATERIAL", value: "COURO ITALIANO FULL-GRAIN" },
              { label: "COR", value: "VINHO PROFUNDO", hasColor: true },
              { label: "SILHUETA", value: "OVERSIZED STRUCTURED" },
              { label: "FORRO", value: "SEDA PURA — PRETO" },
              { label: "PRODUÇÃO", value: "50 UNIDADES — NUMERADAS" },
            ].map((spec) => (
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

        {/* Center Column — Main Image */}
        <div
          className="lg:col-span-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s",
          }}
        >
          <div className="relative aspect-[3/4] overflow-hidden group">
            <img
              src={JACKET_IMAGE}
              alt="DØMMVX Jaqueta Vinho — Vista frontal"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-transparent" />
            {/* Corner marks */}
            <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-white/[0.08]" />
            <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-white/[0.08]" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-white/[0.08]" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-white/[0.08]" />
          </div>
        </div>

        {/* Right Column — Detail + Price */}
        <div
          className="lg:col-span-4 flex flex-col gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.6s",
          }}
        >
          <div className="relative aspect-[16/10] overflow-hidden group">
            <img
              src={DETAIL_IMAGE}
              alt="DØMMVX Jaqueta Vinho — Detalhe do couro"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
              loading="lazy"
            />
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
            <div className="flex items-baseline gap-1">
              <span
                className="text-[#F5F5F5] text-3xl lg:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                R$ 4.890
              </span>
              <span
                className="text-white/25 text-[10px] tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ,00
              </span>
            </div>
            <p
              className="mt-2 text-white/25 text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              EM ATÉ 12X SEM JUROS
            </p>

            {/* Size Selection */}
            <div className="mt-8">
              <span
                className="text-white/20 text-[9px] tracking-[0.3em] uppercase block mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                TAMANHO
              </span>
              <div className="flex gap-2">
                {["P", "M", "G", "GG"].map((size) => (
                  <button
                    key={size}
                    className="w-10 h-10 border border-white/[0.08] text-[#F5F5F5]/50 text-[10px] tracking-[0.15em] hover:border-white/30 hover:text-[#F5F5F5] transition-all duration-300 active:scale-95"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className="mt-8 w-full py-4 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white active:scale-[0.98]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ADICIONAR À SACOLA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
