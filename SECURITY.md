# Security Policy

Buttercut is a theme, not a hosted service, so most exposure depends on how
you deploy it. We still take reports seriously for issues that affect the
theme itself.

## Reporting a vulnerability

- Open a private advisory via GitHub's "Report a vulnerability" button on
  the repository's Security tab. Please include reproduction steps and the
  commit hash you tested against.
- Do **not** open a public issue for sensitive reports.
- Please allow up to 14 days for an initial response.

## Scope

In scope:

- XSS, CSRF, SSRF, injection, or auth bypass introduced by theme code.
- Accidental leaking of secrets through the default demo content, build
  artefacts, or generated metadata.
- Config-driven features that can be abused to include unsafe content at
  render time.

Out of scope:

- Third-party services reached via the optional integrations (GitHub,
  Last.fm, Open-Meteo, Sentry, Supabase). Please report those to the
  respective providers.
- Problems caused solely by user-provided `site.config.ts` values
  (e.g. pasted HTML into demo content).
- Issues that only reproduce on forks with additional custom code.

## Defensive defaults

- Zero-key local runs: every integration degrades to a placeholder when
  its env vars are missing.
- `buildButtercutThemeStyle` sanitises `brand.theme.*` tokens before they
  reach the document — invalid/overlong values are dropped silently.
- No user content is rendered with `dangerouslySetInnerHTML` except the
  sanitized theme style element.

Thanks for helping keep Buttercut safe.
