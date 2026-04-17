import type { ButtercutSocialLink } from "@/lib/config/types";

/**
 * Icon renderers for common social link ids. Matches kaichen.dev's hero row
 * visually — monochrome 24×24 SVGs with an opacity hover. Any unknown id
 * falls back to the label text so users keep full control.
 */
const ICONS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  github: ({ className }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: ({ className }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  twitter: ({ className }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: ({ className }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
  mail: ({ className }) => ICONS.email({ className }),
  rss: ({ className }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 4v3c7.18 0 13 5.82 13 13h3C20 11.163 12.837 4 4 4zm0 6v3c3.866 0 7 3.134 7 7h3c0-5.523-4.477-10-10-10zm1.5 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
    </svg>
  ),
  docs: ({ className }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M14 4v5h5" />
    </svg>
  ),
};

export function ButtercutSocialIcons({ socials }: { socials: ButtercutSocialLink[] }) {
  return (
    <div className="mt-auto flex items-center gap-4 pt-2">
      {socials.map((s) => {
        const Icon = ICONS[s.id] ?? null;
        const isExternal = /^https?:\/\//i.test(s.href);
        const linkProps = isExternal
          ? { target: "_blank", rel: "noopener noreferrer" as const }
          : {};
        return (
          <a
            key={s.id}
            href={s.href}
            {...linkProps}
            aria-label={s.label}
            className="text-zinc-700 opacity-35 transition-opacity duration-300 ease-out hover:opacity-100 dark:text-zinc-300"
          >
            {Icon ? (
              <Icon />
            ) : (
              <span className="font-nunito text-sm underline underline-offset-4">
                {s.label}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
