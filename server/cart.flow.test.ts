/**
 * Live test for the storefront cart flow used by the DØMMVX UI.
 *
 * Proves the exact sequence the frontend performs:
 *   1. Pick a real, available variant from the connected catalog.
 *   2. Create a cart with that variant (createCart).
 *   3. Add another unit of the same variant (addCartLines).
 *   4. Assert the normalized cart shape the UI relies on:
 *      - a non-empty checkoutUrl
 *      - itemCount reflecting the added quantity
 *      - a positive subtotal
 *
 * Auto-skips when Shopify credentials aren't configured so CI stays green.
 */

import { describe, expect, it } from "vitest";
import {
  addCartLines,
  createCart,
  isShopifyConfigured,
  listProducts,
} from "./_core/shopify";

const configured = isShopifyConfigured();

describe.skipIf(!configured)("cart flow (live)", () => {
  it(
    "creates a cart, adds a line, and returns a usable checkout",
    { timeout: 30_000 },
    async () => {
      const products = await listProducts({ first: 10 });
      const product = products.find((p) =>
        p.variants.some((v) => v.availableForSale)
      );
      expect(product, "no product with an available variant").toBeTruthy();

      const variant =
        product!.variants.find((v) => v.availableForSale) ?? product!.variants[0];

      // 1. Create cart with one unit
      const created = await createCart([{ variantId: variant.id, quantity: 1 }]);
      expect(created.id.length).toBeGreaterThan(0);
      expect(created.checkoutUrl).toContain("http");
      expect(created.itemCount).toBe(1);

      // 2. Add another unit of the same variant
      const updated = await addCartLines(created.id, [
        { variantId: variant.id, quantity: 1 },
      ]);
      expect(updated.itemCount).toBe(2);

      const subtotal = Number.parseFloat(updated.subtotal.amount);
      expect(Number.isFinite(subtotal) && subtotal > 0).toBe(true);

      // Checkout URL is opened directly by the UI — must be present.
      expect(updated.checkoutUrl).toContain("http");
    }
  );
});

describe.skipIf(configured)("cart flow (skipped)", () => {
  it("is skipped because Shopify credentials are not set", () => {
    expect(true).toBe(true);
  });
});
