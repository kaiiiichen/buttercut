import type { ButtercutSocialLink } from "@/lib/config/types";
import { ButtercutHoverTip } from "./ButtercutHoverTip";

const ICONS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  github: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  twitter: ({ className }) => ICONS.x({ className }),
  email: ({ className }) => (
    <svg
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
  spotify: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  signal: ({ className }) => (
    <svg viewBox="0 0 128 128" fill="currentColor" className={className} aria-hidden="true">
      <path d="M64 0c3.32 0 6.582.253 9.766.74l-.916 5.931A58.5 58.5 0 0 0 64 6c-3.009 0-5.964.23-8.85.67L54.235.74A64.5 64.5 0 0 1 64 0m15.188 1.813-1.424 5.83a57.7 57.7 0 0 1 16.352 6.779l3.115-5.13a63.6 63.6 0 0 0-18.043-7.479m22.635 10.554-3.545 4.84a58.3 58.3 0 0 1 12.514 12.516l4.841-3.546a64.4 64.4 0 0 0-13.81-13.81m16.885 18.403-5.129 3.115a57.7 57.7 0 0 1 6.778 16.351l5.83-1.423a63.6 63.6 0 0 0-7.479-18.044Zm8.552 23.465-5.931.915A58.4 58.4 0 0 1 122 64c0 3.01-.229 5.965-.671 8.85l5.931.916c.487-3.184.74-6.446.74-9.766s-.253-6.581-.74-9.765m-13.681 39.881a57.7 57.7 0 0 0 6.778-16.352l5.83 1.424a63.6 63.6 0 0 1-7.48 18.043zm-2.787 4.162 4.841 3.546a64.4 64.4 0 0 1-13.81 13.809l-3.546-4.841a58.3 58.3 0 0 0 12.515-12.514m-16.677 15.301 3.116 5.129a63.6 63.6 0 0 1-18.044 7.479l-1.423-5.83a57.7 57.7 0 0 0 16.351-6.778m-21.265 7.75.915 5.931c-3.184.487-6.445.74-9.765.74s-6.582-.253-9.766-.74l.916-5.93c2.884.441 5.84.67 8.85.67a58.4 58.4 0 0 0 8.85-.671m-22.614-.971-1.424 5.829a63.5 63.5 0 0 1-13.823-5.125l-6.074 1.418-1.363-5.843 8.208-1.916 1.953.995a57.5 57.5 0 0 0 12.523 4.642m-27.748-2.54 1.363 5.843-10.411 2.43C6.51 127.707.293 121.489 1.91 114.56l2.429-10.411 5.843 1.363-2.43 10.412c-.606 2.598 1.726 4.93 4.324 4.324zm-11.125-17.37L5.52 99.085l1.418-6.074a63.6 63.6 0 0 1-5.125-13.824l5.829-1.423a57.6 57.6 0 0 0 4.642 12.523l.994 1.953zM6.67 72.85l-5.93.915A64.5 64.5 0 0 1 0 64c0-3.32.253-6.582.74-9.766l5.931.916A58.5 58.5 0 0 0 6 64c0 3.01.229 5.966.67 8.85m.973-22.614-5.83-1.424a63.6 63.6 0 0 1 7.48-18.043l5.129 3.115a57.7 57.7 0 0 0-6.779 16.352m9.565-20.513-4.84-3.546a64.4 64.4 0 0 1 13.809-13.81l3.546 4.84a58.3 58.3 0 0 0-12.515 12.515Zm16.677-15.302-3.116-5.129a63.6 63.6 0 0 1 18.044-7.48l1.423 5.83a57.7 57.7 0 0 0-16.351 6.78Z" />
      <path d="M116 64c0 28.719-23.281 52-52 52-9.11 0-17.672-2.342-25.117-6.457a3.3 3.3 0 0 0-2.351-.341L13.4 114.599l5.397-23.13a3.3 3.3 0 0 0-.34-2.352C14.341 81.671 12 73.109 12 64c0-28.719 23.281-52 52-52s52 23.281 52 52" />
    </svg>
  ),
  rss: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 4v3c7.18 0 13 5.82 13 13h3C20 11.163 12.837 4 4 4zm0 6v3c3.866 0 7 3.134 7 7h3c0-5.523-4.477-10-10-10zm1.5 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
    </svg>
  ),
  docs: ({ className }) => (
    <svg
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

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function ButtercutSocialIcons({
  socials,
  contactGuidanceTip = "Info — edit social links and this tooltip in site.config.ts.",
  className = "",
  inline = false,
}: {
  socials: ButtercutSocialLink[];
  contactGuidanceTip?: string;
  /** Extra classes on the icon row wrapper */
  className?: string;
  /** When true, icons sit inline beside a title (no centered row). */
  inline?: boolean;
}) {
  const linkClass = (id: string) => `home-social-link home-social-link--${id}`;

  return (
    <div
      className={`flex items-center gap-5 ${inline ? "" : "justify-center"} ${className}`.trim()}
    >
      {socials.map((s) => {
        const Icon = ICONS[s.id] ?? null;
        const external = isExternalHref(s.href);

        return (
          <ButtercutHoverTip key={s.id} tip={s.tip ?? s.label} placement="top">
            {external ? (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={linkClass(s.id)}
              >
                {Icon ? (
                  Icon({})
                ) : (
                  <span className="font-nunito text-sm underline underline-offset-4">
                    {s.label}
                  </span>
                )}
              </a>
            ) : (
              <a href={s.href} aria-label={s.label} className={linkClass(s.id)}>
                {Icon ? (
                  Icon({})
                ) : (
                  <span className="font-nunito text-sm underline underline-offset-4">
                    {s.label}
                  </span>
                )}
              </a>
            )}
          </ButtercutHoverTip>
        );
      })}

      <ButtercutHoverTip
        tip={contactGuidanceTip}
        placement="top"
        align="end"
        tapToToggle
        tipClassName="home-help-tip"
        className="size-7 shrink-0 items-center justify-center"
      >
        <button type="button" aria-label="Contact info" className="help-icon">
          ?
        </button>
      </ButtercutHoverTip>
    </div>
  );
}
