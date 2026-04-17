/**
 * `MyHero` — a runnable example of overriding a Buttercut block.
 *
 * What this demonstrates:
 *
 *   1. You can keep Buttercut's layout and only replace a slot, instead
 *      of rewriting the whole hero. Here we let `ButtercutHero` handle
 *      avatar, tagline, body, and socials, and we only swap the title.
 *
 *   2. A simple visual marker ("Custom override active") makes it
 *      obvious at first glance that the override is live — handy while
 *      you are iterating on a new design.
 *
 *   3. Nothing in this file touches theme internals. If Buttercut ships
 *      a new block API in the future, this file is the safe blast
 *      radius: keep editing it, or throw it away.
 *
 * To see it running:
 *   - open `src/custom/register.ts`
 *   - uncomment the two lines under "demo override"
 *   - refresh `/`
 *
 * To remove it: comment the two lines back.
 */

import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { ButtercutHero } from "@/blocks/ButtercutHero";

export function MyHero(props: ButtercutBlockProps) {
  return (
    <div className="relative">
      <span className="absolute -top-5 right-0 inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2 py-0.5 font-jetbrains-mono text-[10px] uppercase tracking-[0.12em] text-white shadow-sm">
        <span aria-hidden>◆</span>
        <span>Custom override active</span>
      </span>

      <ButtercutHero
        {...props}
        slots={{
          title: (
            <h1 className="font-serif text-[44px] font-semibold leading-[1.05] tracking-[-0.01em] text-zinc-900 dark:text-zinc-100 md:text-[56px]">
              <span className="bg-gradient-to-r from-[var(--accent)] to-zinc-900 bg-clip-text text-transparent dark:to-zinc-100">
                {props.config.site.title}
              </span>
            </h1>
          ),
        }}
      />
    </div>
  );
}
