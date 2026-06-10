/**
 * DØMMVX Footer
 * Design: Minimalista brutalista — informação essencial apenas
 */

export default function Footer() {
  return (
    <footer
      className="w-full py-12 lg:py-16 px-6 sm:px-10 lg:px-16 border-t border-white/[0.04]"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        {/* Brand */}
        <div>
          <span
            className="text-[#F5F5F5] text-2xl tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DØMMVX
          </span>
          <p
            className="mt-3 text-white/20 text-[9px] tracking-[0.3em] uppercase max-w-[280px] leading-relaxed"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            MODA INDEPENDENTE DE LUXO — PRODUÇÃO LIMITADA — SÃO PAULO, BRASIL
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          <div>
            <span
              className="text-white/20 text-[9px] tracking-[0.3em] uppercase block mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              NAVEGAÇÃO
            </span>
            <div className="flex flex-col gap-2">
              {["DROPS", "SOBRE", "CONTATO"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#F5F5F5]/50 text-[10px] tracking-[0.2em] uppercase hover:text-[#F5F5F5] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <span
              className="text-white/20 text-[9px] tracking-[0.3em] uppercase block mb-4"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SOCIAL
            </span>
            <div className="flex flex-col gap-2">
              {["INSTAGRAM", "TWITTER/X"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#F5F5F5]/50 text-[10px] tracking-[0.2em] uppercase hover:text-[#F5F5F5] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="lg:text-right">
          <span
            className="text-white/10 text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © 2026 DØMMVX — TODOS OS DIREITOS RESERVADOS
          </span>
        </div>
      </div>
    </footer>
  );
}
