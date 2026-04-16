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
        github: { enabled: true },
      },
    });
    expect(merged.integrations.github.enabled).toBe(true);
    expect(merged.integrations.lastfm.enabled).toBe(false);
  });
});
