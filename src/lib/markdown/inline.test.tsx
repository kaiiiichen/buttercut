import { isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { renderButtercutInlineMarkdown } from "./inline";

type RenderedChild = {
  type: string;
  props: { className?: string; href?: string; children?: ReactNode };
};

function childrenText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(childrenText).join("");
  if (isValidElement(node)) {
    const { children } = (node as unknown as RenderedChild).props;
    return childrenText(children ?? null);
  }
  return "";
}

function nodeType(node: ReactNode): string {
  if (typeof node === "string") return "text";
  if (isValidElement(node)) {
    return (node as unknown as RenderedChild).type;
  }
  return "unknown";
}

describe("renderButtercutInlineMarkdown", () => {
  it("passes plain text through verbatim", () => {
    const nodes = renderButtercutInlineMarkdown("just a sentence.");
    expect(childrenText(nodes)).toBe("just a sentence.");
  });

  it("renders **bold** as <strong>", () => {
    const nodes = renderButtercutInlineMarkdown("be **bold** here");
    const strong = nodes.find((n) => nodeType(n) === "strong");
    expect(strong).toBeDefined();
    expect(childrenText(strong)).toBe("bold");
    expect(childrenText(nodes)).toBe("be bold here");
  });

  it("renders `backticks` as inline <code>", () => {
    const nodes = renderButtercutInlineMarkdown(
      "edit `site.config.ts` then",
    );
    const code = nodes.find((n) => nodeType(n) === "code");
    expect(code).toBeDefined();
    expect(childrenText(code)).toBe("site.config.ts");
    expect(childrenText(nodes)).toBe("edit site.config.ts then");
  });

  it("renders [label](href) as an <a>", () => {
    const nodes = renderButtercutInlineMarkdown(
      "see [docs](https://example.com) now",
    );
    const link = nodes.find((n) => nodeType(n) === "a");
    expect(link).toBeDefined();
    const props = (link as unknown as RenderedChild).props;
    expect(props.href).toBe("https://example.com");
    expect(childrenText(link)).toBe("docs");
  });

  it("mixes bold, code, and links in one pass", () => {
    const nodes = renderButtercutInlineMarkdown(
      "**buttercut** uses `marked` — see [repo](https://github.com/kaiiiichen/buttercut).",
    );
    const types = nodes.map(nodeType);
    expect(types).toContain("strong");
    expect(types).toContain("code");
    expect(types).toContain("a");
    expect(childrenText(nodes)).toBe(
      "buttercut uses marked — see repo.",
    );
  });

  it("leaves unmatched markers as plain text (no crash on '`single')", () => {
    const nodes = renderButtercutInlineMarkdown("a `broken token");
    expect(childrenText(nodes)).toBe("a `broken token");
    expect(nodes.some((n) => nodeType(n) === "code")).toBe(false);
  });
});

describe("renderButtercutInlineMarkdown — XSS hardening", () => {
  // Any scheme that can execute script or inject content must NOT produce
  // a real <a href>. The parser should fall back to plain text so the raw
  // markdown is visible, but inert.
  const hostile = [
    "[x](javascript:alert(1))",
    "[x](JavaScript:alert(1))",
    "[x](data:text/html,<script>alert(1)</script>)",
    "[x](vbscript:msgbox(1))",
    "[x](file:///etc/passwd)",
  ];

  for (const src of hostile) {
    it(`refuses to emit an anchor for ${JSON.stringify(src)}`, () => {
      const nodes = renderButtercutInlineMarkdown(src);
      // The only exploit surface is an `<a href>` (or equivalent attribute).
      // Literal "javascript:" in a text node is inert; we actively *want*
      // the raw markdown visible so authors see the broken link.
      expect(nodes.some((n) => nodeType(n) === "a")).toBe(false);
      const html = renderToStaticMarkup(<>{nodes}</>);
      expect(html).not.toMatch(/<a\b/i);
      expect(html).not.toMatch(/\shref\s*=/i);
      expect(html).toContain("[x](");
    });
  }

  it("escapes < and > in plain text (React default)", () => {
    const nodes = renderButtercutInlineMarkdown(
      "no <script>alert(1)</script> here",
    );
    const html = renderToStaticMarkup(<>{nodes}</>);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("still accepts relative, fragment, and mailto links", () => {
    const ok = [
      "[a](/about)",
      "[b](#section)",
      "[c](page.html)",
      "[d](mailto:hi@example.com)",
      "[e](https://example.com)",
    ];
    for (const src of ok) {
      const nodes = renderButtercutInlineMarkdown(src);
      const link = nodes.find((n) => nodeType(n) === "a");
      expect(link, `expected anchor for ${src}`).toBeDefined();
    }
  });
});

describe("renderButtercutInlineMarkdown — allowedLinkSchemes option", () => {
  it("rejects tel: by default", () => {
    const nodes = renderButtercutInlineMarkdown("[call](tel:+15551234567)");
    expect(nodes.some((n) => nodeType(n) === "a")).toBe(false);
  });

  it("accepts tel: when opted in via allowedLinkSchemes", () => {
    const nodes = renderButtercutInlineMarkdown("[call](tel:+15551234567)", {
      allowedLinkSchemes: ["http", "https", "mailto", "tel"],
    });
    const link = nodes.find((n) => nodeType(n) === "a");
    expect(link).toBeDefined();
    const props = (link as unknown as RenderedChild).props;
    expect(props.href).toBe("tel:+15551234567");
  });

  it("accepts sms: when opted in", () => {
    const nodes = renderButtercutInlineMarkdown("[txt](sms:+15551234567)", {
      allowedLinkSchemes: ["sms"],
    });
    expect(nodes.some((n) => nodeType(n) === "a")).toBe(true);
  });

  it("hard-deny list overrides allowedLinkSchemes — javascript stays blocked", () => {
    // Even if a misconfigured site explicitly lists `javascript`, the helper
    // must refuse. This is the promise of "safe default + extensible".
    const nodes = renderButtercutInlineMarkdown("[x](javascript:alert(1))", {
      allowedLinkSchemes: ["http", "https", "javascript"],
    });
    expect(nodes.some((n) => nodeType(n) === "a")).toBe(false);
  });

  it("empty allow list still permits schemeless (relative/fragment) links", () => {
    const nodes = renderButtercutInlineMarkdown("[home](/)", {
      allowedLinkSchemes: [],
    });
    const link = nodes.find((n) => nodeType(n) === "a");
    expect(link).toBeDefined();
    const props = (link as unknown as RenderedChild).props;
    expect(props.href).toBe("/");
  });
});
