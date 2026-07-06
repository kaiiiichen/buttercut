"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ButtercutAvatarCard } from "@/components/ButtercutAvatarCard";
import { ButtercutSocialIcons } from "@/components/ButtercutSocialIcons";
import { ButtercutTocSection, buttercutTocId } from "@/components/ButtercutTocSection";
import type { ButtercutSocialLink } from "@/lib/config/types";

export const MIN_AVATAR_PX = 120;
export const MIN_ZONE_GAP_PX = 16;
export const INTRO_MID_GAP_PX = 20;
export const GRID_RULE_GAP_PX = 20;
const MD_MEDIA = "(min-width: 768px)";
const GREETING_SECTION_LABEL = "Greeting";
const CONTACT_SECTION_LABEL = "Contact";

type ZoneGaps = { top: number; mid: number; bottom: number };

export type RowLayout = {
  avatarPx: number;
  leftGaps: ZoneGaps;
  introGaps: ZoneGaps;
};

export function computeRowLayout(
  nameHeight: number,
  greetingHeight: number,
  socialHeight: number,
  columnWidth: number,
): RowLayout {
  const introNatural = nameHeight + INTRO_MID_GAP_PX + greetingHeight;
  const leftMin =
    3 * MIN_ZONE_GAP_PX - GRID_RULE_GAP_PX + columnWidth + socialHeight;
  const contentHeight = Math.max(introNatural, leftMin);

  const maxAvatar = columnWidth;
  let avatarPx = Math.min(
    maxAvatar,
    Math.max(
      MIN_AVATAR_PX,
      contentHeight - socialHeight - 3 * MIN_ZONE_GAP_PX + GRID_RULE_GAP_PX,
    ),
  );

  let zone =
    (contentHeight - avatarPx - socialHeight + GRID_RULE_GAP_PX) / 3;
  if (zone < MIN_ZONE_GAP_PX) {
    avatarPx = Math.max(
      MIN_AVATAR_PX,
      Math.min(
        maxAvatar,
        contentHeight - socialHeight - 3 * MIN_ZONE_GAP_PX + GRID_RULE_GAP_PX,
      ),
    );
    zone = MIN_ZONE_GAP_PX;
  }

  const leftGaps: ZoneGaps = {
    top: zone,
    mid: zone,
    bottom: zone - GRID_RULE_GAP_PX,
  };

  const introGaps: ZoneGaps =
    contentHeight > introNatural + 0.5
      ? {
          top: (contentHeight - nameHeight - greetingHeight) / 3,
          mid: (contentHeight - nameHeight - greetingHeight) / 3,
          bottom: (contentHeight - nameHeight - greetingHeight) / 3,
        }
      : { top: 0, mid: INTRO_MID_GAP_PX, bottom: 0 };

  return { avatarPx, leftGaps, introGaps };
}

function clearInlineSpacing(el: HTMLElement | null | undefined) {
  if (!el) return;
  el.style.marginTop = "";
  el.style.marginBottom = "";
}

export type ButtercutIdentityRowProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  nameSectionLabel: string;
  avatar?: ReactNode;
  socials?: ReactNode;
  avatarSrc: string;
  avatarAlt?: string;
  socialsConfig: ButtercutSocialLink[];
  contactGuidanceTip?: string;
};

export function ButtercutIdentityRow({
  children,
  className = "",
  style,
  nameSectionLabel,
  avatar,
  socials,
  avatarSrc,
  avatarAlt = "",
  socialsConfig,
  contactGuidanceTip,
}: ButtercutIdentityRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const nameSectionId = buttercutTocId(nameSectionLabel);
  const greetingSectionId = buttercutTocId(GREETING_SECTION_LABEL);
  const contactSectionId = buttercutTocId(CONTACT_SECTION_LABEL);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const photo = photoRef.current;
    const avatarEl = avatarRef.current;
    const social = socialRef.current;
    const nameSection = row?.querySelector<HTMLElement>(`#${nameSectionId}`);
    const greetingSection = row?.querySelector<HTMLElement>(`#${greetingSectionId}`);
    const contactSection = row?.querySelector<HTMLElement>(`#${contactSectionId}`);

    if (
      !row ||
      !photo ||
      !avatarEl ||
      !social ||
      !nameSection ||
      !greetingSection ||
      !contactSection
    ) {
      return;
    }

    const applySpacing = (next: RowLayout | null) => {
      const isDesktop = window.matchMedia(MD_MEDIA).matches;

      if (!isDesktop || !next) {
        clearInlineSpacing(nameSection);
        clearInlineSpacing(greetingSection);
        clearInlineSpacing(contactSection);
        avatarEl.style.marginTop = "";
        avatarEl.style.width = "";
        avatarEl.style.height = "";
        return;
      }

      nameSection.style.marginTop = `${next.introGaps.top}px`;
      greetingSection.style.marginTop = `${next.introGaps.mid}px`;
      greetingSection.style.marginBottom = `${next.introGaps.bottom}px`;

      avatarEl.style.marginTop = `${next.leftGaps.top}px`;
      avatarEl.style.width = `${next.avatarPx}px`;
      avatarEl.style.height = `${next.avatarPx}px`;
      contactSection.style.marginTop = `${next.leftGaps.mid}px`;
      contactSection.style.marginBottom = `${next.leftGaps.bottom}px`;
    };

    const update = () => {
      if (!window.matchMedia(MD_MEDIA).matches) {
        applySpacing(null);
        return;
      }

      applySpacing(null);

      const next = computeRowLayout(
        nameSection.offsetHeight,
        greetingSection.offsetHeight,
        social.offsetHeight,
        photo.clientWidth,
      );
      applySpacing(next);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(nameSection);
    ro.observe(greetingSection);
    ro.observe(social);
    ro.observe(photo);

    const mq = window.matchMedia(MD_MEDIA);
    mq.addEventListener("change", update);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
      applySpacing(null);
    };
  }, [nameSectionId, greetingSectionId, contactSectionId]);

  return (
    <div
      ref={rowRef}
      data-identity-row
      className={`grid grid-cols-1 gap-y-6 md:grid-cols-[36%_1fr] md:gap-x-10 md:gap-y-5 ${className}`}
      style={style}
    >
      <div className="order-2 min-w-0 md:order-none md:col-start-2 md:row-start-1">
        <div className="flex min-w-0 flex-col gap-5 md:gap-0">{children}</div>
        <div
          style={{ height: 1, margin: "0" }}
          className="w-full max-w-[630px] bg-zinc-200 dark:bg-zinc-700 md:hidden"
        />
      </div>

      <div
        ref={photoRef}
        className="order-1 mx-auto flex w-full max-w-[320px] flex-col items-center gap-4 md:order-none md:col-start-1 md:row-start-1 md:mx-0 md:max-w-none md:gap-0"
      >
        <div
          ref={avatarRef}
          className="mag-card aspect-square w-full shrink-0 overflow-hidden md:aspect-auto"
          style={{ padding: 0 }}
        >
          {avatar ?? (
            <ButtercutAvatarCard src={avatarSrc} alt={avatarAlt} className="h-full w-full" />
          )}
        </div>

        <ButtercutTocSection label={CONTACT_SECTION_LABEL} className="w-full shrink-0">
          <div ref={socialRef}>
            {socials ?? (
              <ButtercutSocialIcons
                socials={socialsConfig}
                contactGuidanceTip={contactGuidanceTip}
              />
            )}
          </div>
        </ButtercutTocSection>

        <div
          style={{ height: 1, margin: "0" }}
          className="w-full bg-zinc-200 dark:bg-zinc-700 md:hidden"
        />
      </div>

      <div
        style={{ height: 1, margin: "0" }}
        className="hidden w-full bg-zinc-200 dark:bg-zinc-700 md:col-start-1 md:row-start-2 md:block"
      />
      <div
        style={{ height: 1, margin: "0" }}
        className="hidden w-full max-w-[630px] bg-zinc-200 dark:bg-zinc-700 md:col-start-2 md:row-start-2 md:block"
      />
    </div>
  );
}
