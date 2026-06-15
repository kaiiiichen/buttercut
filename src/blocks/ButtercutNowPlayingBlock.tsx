import { ButtercutListeningCard } from "@/components/ButtercutListeningCard";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";

export function ButtercutNowPlayingBlock(_props: ButtercutBlockProps) {
  return (
    <section className="mag-card">
      <div className="mag-label">Listening</div>
      <ButtercutListeningCard />
    </section>
  );
}
