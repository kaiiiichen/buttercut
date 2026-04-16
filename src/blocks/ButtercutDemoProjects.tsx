import type { ButtercutDemoProject } from "@/lib/demo/load-demo-content";

export function ButtercutDemoProjects({ projects }: { projects: ButtercutDemoProject[] }) {
  return (
    <section className="mag-card">
      <div className="mag-label">Demo projects</div>
      <div className="space-y-0">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-sm px-2 py-3 no-underline transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="shrink-0 -translate-x-1 text-xs text-[var(--accent)] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
                ↗
              </span>
              <p className="font-serif text-lg font-semibold italic text-zinc-800 transition-colors duration-150 group-hover:text-[var(--accent)] dark:text-zinc-200">
                {p.name}
              </p>
            </div>
            <p className="mt-1 pl-4 font-serif text-xs leading-snug text-zinc-500 dark:text-zinc-400">
              {p.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1 pl-4">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-zinc-100 px-1.5 py-0.5 font-nunito text-[10px] text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
