import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import type { ReactNode } from "react";
import { ButtercutNav } from "@/components/ButtercutNav";
import { ButtercutProviders } from "@/components/ButtercutProviders";
import { siteConfig } from "../../site.config";
import "./globals.css";

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
      <body className="min-h-full font-sans">
        <Script id="buttercut-theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;var t=localStorage.getItem('buttercut-theme');var dark;if(t==='dark')dark=true;else if(t==='light')dark=false;else dark=false;d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`}
        </Script>
        <ButtercutProviders>
          <ButtercutNav config={siteConfig} />
          <main className="flex-1 pt-2">{children}</main>
        </ButtercutProviders>
      </body>
    </html>
  );
}
