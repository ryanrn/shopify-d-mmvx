/**
 * Site configuration router — controla o "password gate" do site público.
 *
 * Modelo:
 * - `siteConfig.status` (público): informa se o gate está ativo e se o
 *   visitante atual já está liberado (via cookie de acesso).
 * - `siteConfig.unlock` (público): valida a senha e, se correta, seta o
 *   cookie de acesso.
 * - `siteConfig.adminGet` (admin): retorna o estado completo para o painel.
 * - `siteConfig.setGate` (admin): ativa/desativa o gate e/ou define a senha.
 *
 * Segurança: a senha é guardada como hash scrypt (salt + derived key) e nunca
 * trafega de volta ao cliente. O acesso liberado é um cookie httpOnly assinado
 * de forma simples com o JWT_SECRET do projeto.
 */

import { TRPCError } from "@trpc/server";
import { parse as parseCookieHeader } from "cookie";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { z } from "zod";
import { getSiteSettings, updateSiteSettings } from "../db";
import { getSessionCookieOptions } from "../_core/cookies";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const ACCESS_COOKIE = "dommvx_gate";
const ACCESS_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 dias

/* ----------------------------- senha (scrypt) ----------------------------- */

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, "hex");
  const derived = scryptSync(password, salt, 64);
  if (keyBuffer.length !== derived.length) return false;
  return timingSafeEqual(keyBuffer, derived);
}

/* --------------------------- cookie de acesso ----------------------------- */

function gateSecret(): string {
  return process.env.JWT_SECRET ?? "dommvx-dev-secret";
}

/** Token = hmac(passwordHash) — invalida automaticamente se a senha mudar. */
function buildAccessToken(passwordHash: string): string {
  return createHmac("sha256", gateSecret()).update(passwordHash).digest("hex");
}

function isAccessTokenValid(token: string | undefined, passwordHash: string | null): boolean {
  if (!token || !passwordHash) return false;
  const expected = buildAccessToken(passwordHash);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/* --------------------------------- router --------------------------------- */

export const siteConfigRouter = router({
  /** Estado público do gate para o visitante atual. */
  status: publicProcedure.query(async ({ ctx }) => {
    const settings = await getSiteSettings();
    const enabled = settings?.passwordGateEnabled ?? false;
    const hasPassword = Boolean(settings?.passwordHash);

    // Se o gate não está ativo (ou nunca teve senha), o site é livre.
    if (!enabled || !hasPassword) {
      return { gateEnabled: false, unlocked: true } as const;
    }

    const cookies = parseCookieHeader(ctx.req.headers.cookie ?? "");
    const token = cookies[ACCESS_COOKIE];
    const unlocked = isAccessTokenValid(token, settings?.passwordHash ?? null);
    return { gateEnabled: true, unlocked } as const;
  }),

  /** Valida a senha e libera o acesso via cookie. */
  unlock: publicProcedure
    .input(z.object({ password: z.string().min(1).max(200) }))
    .mutation(async ({ ctx, input }) => {
      const settings = await getSiteSettings();
      if (!settings?.passwordGateEnabled || !settings.passwordHash) {
        // Gate desativado — nada a fazer, acesso livre.
        return { success: true } as const;
      }

      const ok = verifyPassword(input.password, settings.passwordHash);
      if (!ok) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Senha incorreta." });
      }

      const token = buildAccessToken(settings.passwordHash);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(ACCESS_COOKIE, token, {
        ...cookieOptions,
        maxAge: ACCESS_MAX_AGE_MS,
      });
      return { success: true } as const;
    }),

  /** Estado completo para o painel admin. */
  adminGet: adminProcedure.query(async () => {
    const settings = await getSiteSettings();
    return {
      gateEnabled: settings?.passwordGateEnabled ?? false,
      hasPassword: Boolean(settings?.passwordHash),
      updatedAt: settings?.updatedAt ?? null,
    };
  }),

  /**
   * Ativa/desativa o gate e/ou define uma nova senha.
   * - Para ativar pela primeira vez, é obrigatório enviar `password`.
   * - `password` vazio mantém a senha atual (apenas alterna o estado).
   */
  setGate: adminProcedure
    .input(
      z.object({
        enabled: z.boolean(),
        password: z.string().min(4).max(200).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const settings = await getSiteSettings();
      const patch: { passwordGateEnabled: boolean; passwordHash?: string | null } = {
        passwordGateEnabled: input.enabled,
      };

      if (input.password) {
        patch.passwordHash = hashPassword(input.password);
      }

      // Não permitir ativar sem nenhuma senha configurada.
      if (input.enabled && !input.password && !settings?.passwordHash) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Defina uma senha antes de ativar a proteção.",
        });
      }

      const updated = await updateSiteSettings(patch);
      return {
        gateEnabled: updated?.passwordGateEnabled ?? false,
        hasPassword: Boolean(updated?.passwordHash),
      };
    }),
});

export type SiteConfigRouter = typeof siteConfigRouter;
