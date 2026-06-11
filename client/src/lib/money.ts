import type { Money } from "@shared/commerce/types";

/**
 * Formata um valor Money/string/number em moeda local.
 * Usa pt-BR + BRL como padrão (loja DØMMVX), mas respeita o currencyCode
 * retornado pelo Shopify quando presente.
 */
export function formatPrice(value: Money | string | number, fallbackCurrency = "BRL"): string {
  let amountNum: number;
  let code: string;

  if (typeof value === "object" && value !== null && "amount" in value) {
    amountNum = Number.parseFloat(value.amount);
    code = value.currencyCode || fallbackCurrency;
  } else {
    amountNum = typeof value === "string" ? Number.parseFloat(value) : value;
    code = fallbackCurrency;
  }

  if (Number.isNaN(amountNum)) return "—";

  const locale = code === "BRL" ? "pt-BR" : "en-US";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      minimumFractionDigits: amountNum % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amountNum);
  } catch {
    return `${code} ${amountNum.toFixed(0)}`;
  }
}
