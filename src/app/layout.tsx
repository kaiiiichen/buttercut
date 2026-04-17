import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import type { ReactNode } from "react";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/bitter/400.css";
import "@fontsource/bitter/400-italic.css";
import "@fontsource/bitter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import { ButtercutNav } from "@/components/ButtercutNav";
import { ButtercutNavWaveOverlay } from "@/components/ButtercutNavWaveOverlay";
import { ButtercutProviders } from "@/components/ButtercutProviders";
import { ButtercutSubpageEnter } from "@/components/ButtercutSubpageEnter";
import { buildButtercutThemeStyle } from "@/lib/theme/build-theme-style";
import { siteConfig } from "../../site.config";
import "./globals.css";

const buttercutThemeCss = buildButtercutThemeStyle(siteConfig.brand.theme);

export const metadata: Metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  metadataBase: new URL(siteConfig.site.siteUrl),
  openGraph: {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    url: siteConfig.site.siteUrl,
    siteName: siteConfig.site.title,
    images: [{ url: siteConfig.brand.og.defaultImagePath, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    images: [siteConfig.brand.og.defaultImagePath],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {buttercutThemeCss ? (
          <style
            id="buttercut-theme-overrides"
            // Only sanitized token values from buildButtercutThemeStyle reach here.
            dangerouslySetInnerHTML={{ __html: buttercutThemeCss }}
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Script id="buttercut-theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;var t=localStorage.getItem('buttercut-theme');var dark;if(t==='dark')dark=true;else if(t==='light')dark=false;else dark=window.matchMedia('(prefers-color-scheme: dark)').matches;d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`}
        </Script>
        <ButtercutProviders>
          <ButtercutNavWaveOverlay />
          <ButtercutNav config={siteConfig} />
          <main className="flex-1 pt-16">
            <ButtercutSubpageEnter>{children}</ButtercutSubpageEnter>
          </main>
        </ButtercutProviders>
      </body>
    </html>
  );
}
