import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

/**
 * Estado em memória que simula a linha singleton de site_settings.
 * Mockamos os helpers de db para tornar os testes determinísticos (sem DB real).
 */
type SettingsRow = {
  id: number;
  passwordGateEnabled: boolean;
  passwordHash: string | null;
  updatedAt: Date;
};

let settings: SettingsRow;

vi.mock("./db", () => ({
  getSiteSettings: vi.fn(async () => settings),
  updateSiteSettings: vi.fn(
    async (patch: { passwordGateEnabled?: boolean; passwordHash?: string | null }) => {
      settings = { ...settings, ...patch, updatedAt: new Date() };
      return settings;
    }
  ),
}));

// Import depois do mock para garantir que o router use a versão mockada.
const { appRouter } = await import("./routers");

type CookieCall = { name: string; value: string; options: Record<string, unknown> };

function makeCtx(opts: {
  role?: "user" | "admin";
  authed?: boolean;
  cookieHeader?: string;
}): { ctx: TrpcContext; setCookies: CookieCall[] } {
  const setCookies: CookieCall[] = [];
  const user =
    opts.authed === false
      ? null
      : ({
          id: 1,
          openId: "owner",
          email: "owner@dommvx.com",
          name: "Owner",
          loginMethod: "manus",
          role: opts.role ?? "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        } as NonNullable<TrpcContext["user"]>);

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: { cookie: opts.cookieHeader ?? "" },
    } as unknown as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
    } as unknown as TrpcContext["res"],
  };

  return { ctx, setCookies };
}

beforeEach(() => {
  settings = {
    id: 1,
    passwordGateEnabled: false,
    passwordHash: null,
    updatedAt: new Date(),
  };
});

describe("siteConfig — password gate", () => {
  it("status: site é livre quando o gate está desativado", async () => {
    const { ctx } = makeCtx({});
    const caller = appRouter.createCaller(ctx);
    const res = await caller.siteConfig.status();
    expect(res).toEqual({ gateEnabled: false, unlocked: true });
  });

  it("admin: não permite ativar sem nenhuma senha cadastrada", async () => {
    const { ctx } = makeCtx({ role: "admin" });
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.siteConfig.setGate({ enabled: true })
    ).rejects.toThrow(/senha/i);
  });

  it("admin: ativa o gate definindo uma senha", async () => {
    const { ctx } = makeCtx({ role: "admin" });
    const caller = appRouter.createCaller(ctx);
    const res = await caller.siteConfig.setGate({ enabled: true, password: "drop001" });
    expect(res).toEqual({ gateEnabled: true, hasPassword: true });
    expect(settings.passwordGateEnabled).toBe(true);
    expect(settings.passwordHash).toMatch(/^[0-9a-f]+:[0-9a-f]+$/);
  });

  it("usuário comum não pode alterar o gate (FORBIDDEN)", async () => {
    const { ctx } = makeCtx({ role: "user" });
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.siteConfig.setGate({ enabled: true, password: "x123" })
    ).rejects.toThrow();
  });

  it("status: bloqueado para visitante sem cookie quando gate ativo", async () => {
    // Ativa via admin primeiro
    const admin = makeCtx({ role: "admin" });
    await appRouter.createCaller(admin.ctx).siteConfig.setGate({
      enabled: true,
      password: "drop001",
    });

    const visitor = makeCtx({ authed: false });
    const res = await appRouter.createCaller(visitor.ctx).siteConfig.status();
    expect(res).toEqual({ gateEnabled: true, unlocked: false });
  });

  it("unlock: senha incorreta é rejeitada; senha correta seta cookie e libera", async () => {
    // Ativa
    const admin = makeCtx({ role: "admin" });
    await appRouter.createCaller(admin.ctx).siteConfig.setGate({
      enabled: true,
      password: "drop001",
    });

    // Senha errada
    const wrong = makeCtx({ authed: false });
    await expect(
      appRouter.createCaller(wrong.ctx).siteConfig.unlock({ password: "errada" })
    ).rejects.toThrow();

    // Senha certa → seta cookie
    const right = makeCtx({ authed: false });
    const ok = await appRouter
      .createCaller(right.ctx)
      .siteConfig.unlock({ password: "drop001" });
    expect(ok).toEqual({ success: true });
    expect(right.setCookies).toHaveLength(1);
    const cookie = right.setCookies[0];
    expect(cookie.name).toBe("dommvx_gate");
    expect(cookie.value).toMatch(/^[0-9a-f]+$/);

    // Visitante com o cookie válido fica liberado
    const cookieHeader = `dommvx_gate=${cookie.value}`;
    const back = makeCtx({ authed: false, cookieHeader });
    const status = await appRouter.createCaller(back.ctx).siteConfig.status();
    expect(status).toEqual({ gateEnabled: true, unlocked: true });
  });

  it("admin: desativar o gate torna o site livre novamente", async () => {
    const admin = makeCtx({ role: "admin" });
    await appRouter.createCaller(admin.ctx).siteConfig.setGate({
      enabled: true,
      password: "drop001",
    });
    await appRouter.createCaller(admin.ctx).siteConfig.setGate({ enabled: false });

    const visitor = makeCtx({ authed: false });
    const res = await appRouter.createCaller(visitor.ctx).siteConfig.status();
    expect(res.gateEnabled).toBe(false);
    expect(res.unlocked).toBe(true);
  });
});
