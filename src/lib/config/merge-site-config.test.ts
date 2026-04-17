import { describe, expect, it } from "vitest";
import { mergeSiteConfig } from "./merge-site-config";

describe("mergeSiteConfig", () => {
  it("fills defaults when input is empty", () => {
    const merged = mergeSiteConfig({});
    expect(merged.site.title).toBe("Buttercut");
    expect(merged.integrations.sentry.enabled).toBe(false);
    expect(merged.home.blocks[0]?.id).toBe("hero");
  });

  it("merges nested site fields without dropping other defaults", () => {
    const merged = mergeSiteConfig({
      site: { title: "Custom" },
    });
    expect(merged.site.title).toBe("Custom");
    expect(merged.site.description.length).toBeGreaterThan(0);
  });

  it("merges integration flags individually", () => {
    const merged = mergeSiteConfig({
      integrations: {
        github: { enabled: false },
      },
    });
    expect(merged.integrations.github.enabled).toBe(false);
    expect(merged.integrations.lastfm.enabled).toBe(false);
  });

  it("merges brand.theme on top of defaults, keeping unrelated brand fields", () => {
    const merged = mergeSiteConfig({
      brand: {
        theme: { accent: "#ff6f3c" },
      },
    });
    expect(merged.brand.theme).toEqual({ accent: "#ff6f3c" });
    expect(merged.brand.avatar).toBe("/avatar-placeholder.svg");
    expect(merged.brand.og.defaultImagePath).toBe("/og-default.svg");
  });

  it("leaves brand.theme as the default empty object when not provided", () => {
    const merged = mergeSiteConfig({ brand: { avatar: "/a.svg" } });
    expect(merged.brand.avatar).toBe("/a.svg");
    expect(merged.brand.theme).toEqual({});
  });

  it("exposes a sensible default for content.allowedLinkSchemes", () => {
    const merged = mergeSiteConfig({});
    expect(merged.content.allowedLinkSchemes).toEqual([
      "http",
      "https",
      "mailto",
    ]);
  });

  it("replaces content.allowedLinkSchemes when provided", () => {
    const merged = mergeSiteConfig({
      content: { allowedLinkSchemes: ["https", "mailto", "tel"] },
    });
    expect(merged.content.allowedLinkSchemes).toEqual([
      "https",
      "mailto",
      "tel",
    ]);
  });
});
