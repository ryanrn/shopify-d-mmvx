/**
 * DØMMVX — Painel Admin
 * Acesso restrito ao owner/admin (login Manus). Permite:
 * - Ativar / desativar a proteção por senha do site público
 * - Definir / atualizar a senha de acesso
 *
 * Observação: o /admin não é coberto pelo password gate público — ele usa o
 * login Manus (role admin) como camada de autenticação.
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Lock, ShieldCheck, ShieldOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";

  const utils = trpc.useUtils();
  const configQuery = trpc.siteConfig.adminGet.useQuery(undefined, {
    enabled: isAdmin,
    retry: false,
  });

  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (configQuery.data) {
      setEnabled(configQuery.data.gateEnabled);
    }
  }, [configQuery.data]);

  const setGate = trpc.siteConfig.setGate.useMutation({
    onSuccess: async (data) => {
      setPassword("");
      await utils.siteConfig.adminGet.invalidate();
      await utils.siteConfig.status.invalidate();
      toast(
        data.gateEnabled
          ? "Proteção por senha ATIVADA."
          : "Proteção por senha DESATIVADA."
      );
    },
    onError: (err) => {
      toast(err.message || "Não foi possível salvar.");
    },
  });

  /* --------------------------- Estados de acesso --------------------------- */

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <span
          className="text-white/30 text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          CARREGANDO...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <GateShell title="ACESSO ADMIN">
        <p
          className="text-white/40 text-xs tracking-[0.1em] uppercase mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Faça login com a conta proprietária para gerenciar o site.
        </p>
        <a
          href={getLoginUrl()}
          className="inline-block w-full text-center py-4 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white active:scale-[0.98]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ENTRAR
        </a>
      </GateShell>
    );
  }

  if (!isAdmin) {
    return (
      <GateShell title="ACESSO NEGADO">
        <p
          className="text-white/40 text-xs tracking-[0.1em] uppercase leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Esta área é restrita ao administrador da loja.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-white/40 hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          VOLTAR AO SITE
        </Link>
      </GateShell>
    );
  }

  /* ------------------------------- Painel ---------------------------------- */

  const hasPassword = configQuery.data?.hasPassword ?? false;

  const handleSave = () => {
    // Para ATIVAR sem senha cadastrada, exigir nova senha.
    if (enabled && !hasPassword && password.trim().length < 4) {
      toast("Defina uma senha de pelo menos 4 caracteres para ativar.");
      return;
    }
    setGate.mutate({
      enabled,
      password: password.trim().length >= 4 ? password.trim() : undefined,
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Header */}
      <header className="w-full px-6 lg:px-12 py-7 flex items-center justify-between border-b border-white/[0.06]">
        <span
          className="text-[#F5F5F5] tracking-[0.2em] text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          DØMMVX — ADMIN
        </span>
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          VER SITE
        </Link>
      </header>

      <main className="px-6 lg:px-12 py-16 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="w-4 h-4 text-[#5C1A1A]" />
          <h1
            className="text-[#F5F5F5] tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
            }}
          >
            PROTEÇÃO DO SITE
          </h1>
        </div>
        <p
          className="text-white/40 text-xs tracking-[0.1em] uppercase mb-12 leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Quando ativada, todo o site público fica bloqueado por uma tela de
          senha. Ideal para pré-lançamentos e acesso exclusivo.
        </p>

        {/* Status atual */}
        <div className="flex items-center gap-3 mb-10 p-4 border border-white/[0.08] bg-[#171717]">
          {configQuery.data?.gateEnabled ? (
            <ShieldCheck className="w-5 h-5 text-[#F5F5F5]" />
          ) : (
            <ShieldOff className="w-5 h-5 text-white/30" />
          )}
          <span
            className="text-white/60 text-[10px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            STATUS ATUAL:{" "}
            <span className="text-[#F5F5F5]">
              {configQuery.data?.gateEnabled ? "PROTEGIDO" : "PÚBLICO"}
            </span>
            {hasPassword ? " · SENHA DEFINIDA" : " · SEM SENHA"}
          </span>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between py-5 border-t border-white/[0.08]">
          <span
            className="text-[#F5F5F5] text-[11px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ATIVAR PROTEÇÃO
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((v) => !v)}
            className={`relative w-14 h-7 transition-colors duration-300 ${
              enabled ? "bg-[#F5F5F5]" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 transition-transform duration-300 ${
                enabled
                  ? "translate-x-8 bg-[#0A0A0A]"
                  : "translate-x-1 bg-white/60"
              }`}
            />
          </button>
        </div>

        {/* Senha */}
        <div className="py-5 border-t border-b border-white/[0.08]">
          <label
            className="block text-[#F5F5F5] text-[11px] tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {hasPassword ? "ALTERAR SENHA" : "DEFINIR SENHA"}
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={
              hasPassword
                ? "Deixe em branco para manter a atual"
                : "Mínimo 4 caracteres"
            }
            className="w-full bg-transparent border border-white/[0.12] focus:border-white/40 outline-none text-[#F5F5F5] text-sm tracking-[0.1em] px-4 py-3.5 transition-colors duration-300 placeholder:text-white/20"
            style={{ fontFamily: "var(--font-mono)" }}
          />
        </div>

        {/* Save */}
        <button
          type="button"
          onClick={handleSave}
          disabled={setGate.isPending}
          className="mt-10 w-full py-4 bg-[#F5F5F5] text-[#0A0A0A] text-[10px] tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {setGate.isPending ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
        </button>
      </main>
    </div>
  );
}

/* ------------------------- Shell de tela centrada ------------------------- */

function GateShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="w-full max-w-sm text-center">
        <h1
          className="text-[#F5F5F5] tracking-[0.05em] mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 9vw, 4rem)",
            lineHeight: "0.9",
          }}
        >
          DØMMVX
        </h1>
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-6 h-px bg-[#5C1A1A]" />
          <span
            className="text-white/30 text-[9px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {title}
          </span>
          <div className="w-6 h-px bg-[#5C1A1A]" />
        </div>
        {children}
      </div>
    </div>
  );
}
