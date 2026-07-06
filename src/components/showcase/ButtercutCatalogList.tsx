import type { CatalogEntry } from "@/lib/showcase/catalog";

export function ButtercutCatalogList({ items }: { items: readonly CatalogEntry[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.name}>
          <p className="ui-heading font-nunito text-[17px] font-semibold leading-snug">
            {item.name}
          </p>
          <p className="ui-hint mt-1">{item.desc}</p>
        </li>
      ))}
    </ul>
  );
}
