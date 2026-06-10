/**
 * DØMMVX Hero Section
 * Design Philosophy: "Void Architecture" — Brutalismo Espacial
 * 
 * - Grandes áreas de preto absoluto como canvas infinito
 * - Tipografia gigante como estrutura arquitetônica
 * - Assimetria radical — split 62/38
 * - Escassez visual = exclusividade percebida
 * - Zero border-radius — brutalismo puro
 */

import { useEffect, useRef, useState } from "react";

const MODEL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663137495765/8bdmdadQ43ueUq4uRA5LzB/dommvx-model-jacket-6DKVfMkh7k9eagSTiHaYzB.webp";
const JACKET_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663137495765/8bdmdadQ43ueUq4uRA5LzB/dommvx-jacket-hero-SXiXewszXRDncoH6vweeyr.webp";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const unitsLeft = 7;
  const totalUnits = 50;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x: x * 4, y: y * 4 });
    };

    const el = heroRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      return () => el.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] max-h-[1200px] overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-px z-30 hidden lg:block"
        style={{
          left: "62%",
          backgroundColor: "rgba(255,255,255,0.04)",
          transform: isLoaded ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0.8s",
        }}
      />

      {/* Mobile Background Image */}
      <div className="absolute inset-0 lg:hidden z-0">
        <img
          src={JACKET_IMAGE}
          alt=""
          className="w-full h-full object-cover"
          style={{
            opacity: isLoaded ? 0.2 : 0,
            transition: "opacity 1.5s ease 0.3s",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
      </div>

      {/* Desktop Layout: Split 62/38 */}
      <div className="relative z-20 h-full flex">
        {/* LEFT PANEL — Content (62%) */}
        <div className="w-full lg:w-[62%] h-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-8 lg:py-12">

          {/* Top Nav */}
          <nav
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(-10px)",
              transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[#F5F5F5] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                DØMMVX
              </span>
              <div className="hidden md:flex items-center gap-8">
                {["COLEÇÃO", "SOBRE", "CONTATO"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[#F5F5F5]/50 text-[10px] tracking-[0.25em] uppercase hover:text-[#F5F5F5] transition-colors duration-500"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content — Center */}
          <div className="flex-1 flex flex-col justify-center relative">
            {/* Rotated Side Text */}
            <div
              className="absolute -left-4 lg:-left-2 top-1/2 -translate-y-1/2 hidden sm:block"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg) translateX(50%)",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 1s ease 1.2s",
              }}
            >
              <span
                className="text-[8px] tracking-[0.5em] text-white/15 uppercase whitespace-nowrap"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                DROP 001 — EDIÇÃO LIMITADA
              </span>
            </div>

            {/* Brand Name */}
            <div className="ml-6 sm:ml-12 lg:ml-16">
              <h1
                className="text-[#F5F5F5] leading-[0.82] tracking-[0.06em] uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4.5rem, 13vw, 12rem)",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(40px)",
                  transition: "all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s",
                }}
              >
                DØMMVX
              </h1>

              {/* Subtitle line */}
              <div
                className="mt-6 lg:mt-10 flex items-center gap-4"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.5s",
                }}
              >
                <div className="w-10 h-px bg-[#5C1A1A]" />
                <span
                  className="text-[#F5F5F5]/40 text-[11px] tracking-[0.35em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  DROP 001
                </span>
              </div>

              {/* Product Description */}
              <p
                className="mt-5 text-[#F5F5F5]/35 text-[10px] lg:text-[11px] tracking-[0.18em] uppercase max-w-[340px] leading-[1.8]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 200,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.7s",
                }}
              >
                JAQUETA VINHO EM COURO PREMIUM<br />
                SILHUETA OVERSIZED — CONSTRUÇÃO ARTESANAL
              </p>
            </div>
          </div>

          {/* Bottom Bar — Counter + CTA */}
          <div
            className="flex items-end justify-between ml-6 sm:ml-12 lg:ml-16"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1) 1s",
            }}
          >
            {/* Units Counter */}
            <div>
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[#F5F5F5] text-3xl lg:text-[2.5rem] font-bold leading-none"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {String(unitsLeft).padStart(2, "0")}
                </span>
                <span
                  className="text-[#F5F5F5]/25 text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  / {totalUnits} UNIDADES
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div
                  className="w-[6px] h-[6px] bg-[#5C1A1A]"
                  style={{
                    animation: "pulse-slow 2.5s ease-in-out infinite",
                  }}
                />
                <span
                  className="text-[#5C1A1A] text-[8px] tracking-[0.35em] uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  RESTANTES
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 w-40 lg:w-48 h-px bg-white/[0.08] relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#5C1A1A]/80"
                  style={{
                    width: isLoaded ? `${((totalUnits - unitsLeft) / totalUnits) * 100}%` : "0%",
                    transition: "width 2s cubic-bezier(0.23, 1, 0.32, 1) 1.5s",
                  }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button className="group relative border border-[#F5F5F5]/15 px-8 lg:px-10 py-3 lg:py-4 overflow-hidden transition-all duration-500 hover:border-[#F5F5F5]/50">
              <span className="absolute inset-0 bg-[#F5F5F5] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              <span
                className="relative text-[9px] lg:text-[10px] tracking-[0.4em] uppercase text-[#F5F5F5] group-hover:text-[#0A0A0A] transition-colors duration-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ADQUIRIR
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT PANEL — Image (38%) */}
        <div className="hidden lg:block w-[38%] h-full relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${isLoaded ? 1 : 1.05})`,
              opacity: isLoaded ? 1 : 0,
              transition: isLoaded
                ? "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 2s ease 0.4s"
                : "none",
            }}
          >
            <img
              src={MODEL_IMAGE}
              alt="DØMMVX DROP 001 — Jaqueta Vinho"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>
          {/* Gradient overlays for blending */}
          <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#0A0A0A]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#0A0A0A]/30 to-transparent pointer-events-none" />

          {/* Image corner text */}
          <div
            className="absolute bottom-12 right-8 text-right z-10"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 1s ease 1.8s",
            }}
          >
            <span
              className="text-[#F5F5F5]/15 text-[8px] tracking-[0.5em] uppercase block"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              COURO ITALIANO
            </span>
            <span
              className="text-[#F5F5F5]/15 text-[8px] tracking-[0.5em] uppercase block mt-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PRODUÇÃO LIMITADA
            </span>
          </div>
        </div>
      </div>

      {/* Edition Watermark — Background */}
      <div
        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 2s ease 1.5s",
        }}
      >
        <span
          className="text-white/[0.02] whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(10rem, 22vw, 25rem)",
            letterSpacing: "0.1em",
          }}
        >
          001
        </span>
      </div>
    </section>
  );
}
