/** Live demo of .mag-card and .mag-card-inset — hover to feel the lift. */

export function ButtercutMagCardDemo() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="mag-card">
        <div className="mag-label">Primary card</div>
        <p className="ui-body-lg">
          Home widgets, about sections, and sandbox panels use{" "}
          <code className="font-jetbrains-mono text-[12px]">.mag-card</code>. Hover this box — it
          lifts, the shadow grows, and the bottom edge warms to bronze.
        </p>
      </div>

      <div className="mag-card-inset">
        <div className="mag-label">Inset card</div>
        <p className="ui-body-lg">
          Nested lists use{" "}
          <code className="font-jetbrains-mono text-[12px]">.mag-card-inset</code> — same lift and
          accent border, lighter shadow.
        </p>
      </div>

      <div className="mag-card md:col-span-2">
        <div className="mag-label">Nested example</div>
        <div className="mag-card-inset">
          <div className="mag-label">Course projects</div>
          <p className="ui-body-lg">
            On a real page, inset cards sit inside a parent card — like Projects on the home page.
          </p>
        </div>
      </div>
    </div>
  );
}
