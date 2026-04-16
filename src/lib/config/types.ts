export type ButtercutNavItem = {
  label: string;
  href: string;
};

export type ButtercutSocialLink = {
  id: string;
  label: string;
  href: string;
};

export type ButtercutHomeBlockId = "hero" | "demo_projects" | "integrations";

export type ButtercutHomeBlock = {
  id: ButtercutHomeBlockId;
  enabled: boolean;
};

export type ButtercutIntegrationKey =
  | "lastfm"
  | "github"
  | "supabase"
  | "sentry"
  | "weather";

export type ButtercutIntegrationsConfig = Record<
  ButtercutIntegrationKey,
  { enabled: boolean }
>;

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
      /** Path under `public/` for default OG image */
      defaultImagePath: string;
    };
  };
  integrations: ButtercutIntegrationsConfig;
};

export type ButtercutSiteConfigInput = Partial<{
  site: Partial<ButtercutSiteConfig["site"]>;
  nav: ButtercutNavItem[];
  socials: ButtercutSocialLink[];
  home: Partial<Pick<ButtercutSiteConfig["home"], "blocks">>;
  brand: Partial<ButtercutSiteConfig["brand"]>;
  integrations: Partial<ButtercutIntegrationsConfig>;
}>;
