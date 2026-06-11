/**
 * DØMMVX — Lookbook
 * Página editorial placeholder. Mantém a linguagem brutalista do site.
 * O conteúdo (imagens de campanha, séries fotográficas) será adicionado depois.
 */

import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const PLACEHOLDER_SLOTS = [
  { id: "01", label: "CAMPANHA", aspect: "aspect-[3/4]" },
  { id: "02", label: "EDITORIAL", aspect: "aspect-[4/5]" },
  { id: "03", label: "DETALHE", aspect: "aspect-square" },
  { id: "04", label: "SILHUETA", aspect: "aspect-[3/4]" },
];

export default function Lookbook() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Nav */}
      <header className="w-full px-6 lg:px-12 py-7 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#F5F5F5] tracking-[0.2em] text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DØMMVX
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          VOLTAR
        </Link>
      </header>

      {/* Hero editorial */}
      <section className="px-6 lg:px-12 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-px bg-[#5C1A1A]" />
          <span
            className="text-white/30 text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            LOOKBOOK — DROP 001
          </span>
        </div>
        <h1
          className="text-[#F5F5F5] leading-[0.85]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 14vw, 12rem)",
          }}
        >
          LOOKBOOK
        </h1>
        <p
          className="mt-8 max-w-md text-white/40 text-xs tracking-[0.1em] leading-relaxed uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Série editorial em preparação. A direção de arte do DROP 001 será
          revelada em breve.
        </p>
      </section>

      {/* Grid de placeholders */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {PLACEHOLDER_SLOTS.map((slot, i) => (
            <div
              key={slot.id}
              className={`relative ${slot.aspect} bg-[#171717] border border-white/[0.06] overflow-hidden group ${
                i % 3 === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Marca d'água do índice */}
              <span
                className="absolute top-5 left-5 text-white/10 text-[10px] tracking-[0.3em]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {slot.id} / 04
              </span>
              {/* Label central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-white/15 text-[11px] tracking-[0.45em] uppercase transition-colors duration-500 group-hover:text-white/30"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {slot.label}
                </span>
              </div>
              {/* Tag inferior */}
              <span
                className="absolute bottom-5 right-5 text-white/10 text-[9px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                EM BREVE
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé mínimo */}
      <footer className="px-6 lg:px-12 py-10 border-t border-white/[0.06]">
        <p
          className="text-white/20 text-[9px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © 2026 DØMMVX — PRODUÇÃO LIMITADA
        </p>
      </footer>
    </div>
  );
}
