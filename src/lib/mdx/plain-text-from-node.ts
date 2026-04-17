import { isValidElement } from "react";
import type { ReactNode } from "react";

/**
 * Best-effort plain text for MDX heading children (strings, nested
 * elements, `code`, etc.) — feeds `github-slugger` the same way
 * `rehype-slug` would on raw HTML.
 */
export function plainTextFromNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainTextFromNode).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children != null) return plainTextFromNode(props.children);
  }
  return "";
}
