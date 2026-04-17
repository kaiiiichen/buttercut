import { isValidElement, type ReactNode } from "react";
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
