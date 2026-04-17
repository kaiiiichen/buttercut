import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { plainTextFromNode } from "./plain-text-from-node";

describe("plainTextFromNode", () => {
  it("joins strings and nested text", () => {
    expect(plainTextFromNode(["a", " ", "b"])).toBe("a b");
  });

  it("walks a React element child", () => {
    expect(plainTextFromNode(createElement("code", {}, "foo"))).toBe("foo");
  });
});
