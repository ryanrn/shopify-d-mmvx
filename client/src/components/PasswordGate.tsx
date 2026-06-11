/**
 * DØMMVX — Password Gate
 * Envolve o site público. Quando o gate está ativo e o visitante ainda não
 * está liberado, renderiza uma tela de senha brutalista no lugar do conteúdo.
 * Caso contrário, renderiza os filhos normalmente.
 */

import { trpc } from "@/lib/trpc";
import { useState } from "react";
import type { ReactNode } from "react";

export default function PasswordGate({ children }: { children: ReactNode }) {
  const utils = trpc.useUtils();
  const { data: status, isLoading } = trpc.siteConfig.status.useQuery(undefined, {
    staleTime: 60_000,
  });

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const unlock = trpc.siteConfig.unlock.useMutation({
    onSuccess: async () => {
      setError(false);
      setPassword("");
      await utils.siteConfig.status.invalidate();
    },
    onError: () => setError(true),
  });

  // Enquanto carrega o status, mantém o fundo preto (evita flash de conteúdo).
  if (isLoading) {
    return <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }} />;
  }

  // Gate desativado ou já liberado → mostra o site.
  if (!status?.gateEnabled || status.unlocked) {
    return <>{children}</>;
  }

  // Tela de senha.
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="text-center mb-16">
          <h1
            className="text-[#F5F5F5] tracking-[0.05em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 12vw, 5rem)",
              lineHeight: "0.9",
            }}
          >
            DØMMVX
          </h1>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-6 h-px bg-[#5C1A1A]" />
            <span
              className="text-white/30 text-[9px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ACESSO RESTRITO
            </span>
            <div className="w-6 h-px bg-[#5C1A1A]" />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password.trim().length === 0) return;
            unlock.mutate({ password });
          }}
        >
          <label
            className="block text-white/25 text-[9px] tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            SENHA
          </label>
          <input
            type="password"
            value={password}
            autoFocus
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            className="w-full bg-transparent border border-white/[0.12] focus:border-white/40 outline-none text-[#F5F5F5] text-sm tracking-[0.15em] px-4 py-3.5 transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)" }}
            placeholder="••••••••"
          />

          {error && (
            <p
              className="mt-3 text-[#5C1A1A] text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              SENHA INCORRETA
            </p>
          )}

          <button
            type="submit"
            disabled={unlock.isPending || password.trim().length === 0}
            className="mt-8 w-full py-4 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {unlock.isPending ? "VERIFICANDO..." : "ENTRAR"}
          </button>
        </form>

        <p
          className="mt-12 text-center text-white/15 text-[8px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          © 2026 DØMMVX — PRODUÇÃO LIMITADA
        </p>
      </div>
    </div>
  );
}
