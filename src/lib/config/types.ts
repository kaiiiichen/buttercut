export type ButtercutNavItem = {
  label: string;
  href: string;
};

export type ButtercutSocialLink = {
  id: string;
  label: string;
  href: string;
};

/**
 * Home block IDs are open strings so users can register custom blocks.
 * Built-in IDs: "hero" | "status" | "now_playing" | "weather" |
 *                "demo_projects" | "integrations".
 * `status` is a convenience block that renders `now_playing` and
 * `weather` side-by-side; use the individual ids if you want them
 * stacked instead.
 */
export type ButtercutHomeBlockId = string;

export type ButtercutHomeBlock = {
  id: ButtercutHomeBlockId;
  enabled: boolean;
};

export type ButtercutGitHubIntegration = {
  enabled: boolean;
  /** Optional repos (owner/name). Used to show star counts inline. */
  repos?: string[];
};

export type ButtercutLastfmIntegration = {
  enabled: boolean;
  username?: string;
};

export type ButtercutWeatherIntegration = {
  enabled: boolean;
  lat?: number;
  lon?: number;
  /** Human-readable location shown in the UI */
  label?: string;
  /** IANA tz name, e.g. "America/Los_Angeles" */
  timezone?: string;
};

export type ButtercutIntegrationsConfig = {
  github: ButtercutGitHubIntegration;
  lastfm: ButtercutLastfmIntegration;
  supabase: { enabled: boolean };
  sentry: { enabled: boolean };
  weather: ButtercutWeatherIntegration;
};

export type ButtercutIntegrationKey = keyof ButtercutIntegrationsConfig;

/**
 * Overrides any subset of Buttercut's CSS color tokens.
 * `...Dark` variants apply inside `.dark`; omit to inherit the default.
 * Any valid CSS color value works (hex, rgb, oklch, etc.).
 */
export type ButtercutThemeTokens = Partial<{
  accent: string;
  accentDark: string;
  background: string;
  backgroundDark: string;
  foreground: string;
  foregroundDark: string;
}>;

/**
 * Content-level knobs that affect how author copy is parsed and rendered.
 *
 * @see `/guide#short-copy` — the in-app tutorial has worked examples and
 *      notes on extending the URL allow list.
 */
export type ButtercutContentConfig = {
  /**
   * URL schemes (without the trailing colon) that `renderButtercutInlineMarkdown`
   * may emit as real `<a href>` anchors. Anything else falls back to raw text.
   *
   * Defaults to `["http", "https", "mailto"]`. Schemeless URLs (relative paths,
   * fragments, bare filenames) always pass regardless of this list.
   *
   * A built-in hard-deny list — `javascript`, `data`, `vbscript`, `file` —
   * always overrides this setting, so `content.allowedLinkSchemes` cannot
   * accidentally introduce a known-exploitable scheme.
   */
  allowedLinkSchemes?: string[];
};

export type ButtercutSiteConfig = {
  site: {
    title: string;
    description: string;
    siteUrl: string;
  };
  nav: ButtercutNavItem[];
  socials: ButtercutSocialLink[];
  home: {
    blocks: ButtercutHomeBlock[];
  };
  brand: {
    avatar: string;
    logo?: string;
    og: {
      defaultImagePath: string;
    };
    theme?: ButtercutThemeTokens;
  };
  integrations: ButtercutIntegrationsConfig;
  content: ButtercutContentConfig;
};

export type ButtercutSiteConfigInput = Partial<{
  site: Partial<ButtercutSiteConfig["site"]>;
  nav: ButtercutNavItem[];
  socials: ButtercutSocialLink[];
  home: Partial<Pick<ButtercutSiteConfig["home"], "blocks">>;
  brand: Partial<ButtercutSiteConfig["brand"]> & {
    theme?: ButtercutThemeTokens;
  };
  integrations: Partial<{
    github: Partial<ButtercutGitHubIntegration>;
    lastfm: Partial<ButtercutLastfmIntegration>;
    supabase: Partial<{ enabled: boolean }>;
    sentry: Partial<{ enabled: boolean }>;
    weather: Partial<ButtercutWeatherIntegration>;
  }>;
  content: Partial<ButtercutContentConfig>;
}>;
