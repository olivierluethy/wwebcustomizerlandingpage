"use client";

import {
  INSTALL_TRUST_LINE,
  getInstallPreview,
} from "@/lib/install-cta-copy";

/**
 * The reassurance block under an install button: a hover-revealed preview of
 * what installing gives you, plus the constant trust line.
 *
 * Exists so all seven install CTAs say the same thing in the same order. When
 * this copy lived inline at each call site it drifted — the hero said "it's
 * free", the CTA section said "Install Extension", the nav said nothing.
 *
 * USAGE: the parent element wrapping the button must carry Tailwind's `group`
 * class, since the preview reveals on `group-hover`. Render this as a sibling
 * of the button inside that group:
 *
 *     <div className="group inline-flex flex-col items-center">
 *       <Button …>{INSTALL_BUTTON_LABEL}</Button>
 *       <InstallReassurance location="install_hero" />
 *     </div>
 *
 * `group-focus-within` is included so keyboard users tabbing to the button get
 * the same preview mouse users get.
 *
 * The preview is `hidden md:block`: hover doesn't exist on touch, so on a phone
 * it would be permanently invisible reserved space. The trust line always
 * shows. On desktop the preview's height is reserved whether or not it's
 * visible, so revealing it never shifts the layout under the pointer.
 */
export function InstallReassurance({
  location,
  className = "",
  align = "center",
  popover = false,
}: {
  location: string;
  /** Extra classes for the wrapper (spacing/width tweaks per placement). */
  className?: string;
  align?: "center" | "left";
  /**
   * Render the whole block as a hover-revealed panel floating below the button
   * instead of as inline text under it. For the nav, where a permanent two-line
   * block would blow out a fixed-height header. Requires `relative` on the
   * `group` wrapper.
   */
  popover?: boolean;
}) {
  const alignment = align === "left" ? "text-left" : "text-center";

  if (popover) {
    return (
      <div
        className={`pointer-events-none absolute right-0 top-full z-50 mt-2 hidden w-64 rounded-xl border border-border bg-card/95 p-3 text-left shadow-xl backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none md:block ${className}`}
        aria-hidden="true"
      >
        <p className="text-xs leading-4 text-foreground">
          {getInstallPreview(location)}
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {INSTALL_TRUST_LINE}
        </p>
      </div>
    );
  }

  return (
    <div className={`mt-2 ${alignment} ${className}`}>
      <p
        className="hidden md:block text-xs leading-4 text-muted-foreground/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
        aria-hidden="true"
      >
        {getInstallPreview(location)}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">{INSTALL_TRUST_LINE}</p>
    </div>
  );
}
