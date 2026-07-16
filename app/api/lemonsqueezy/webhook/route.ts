import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Lemon Squeezy webhook — the AUTHORITATIVE source for Pro conversions.
 *
 * checkout_completed cannot be detected client-side (the purchase finishes on
 * Lemon Squeezy's domain, with the extension popup closed), so we emit it here,
 * server-side, on `order_created`. Refunds emit `pro_refunded`.
 *
 * Setup (see .env.example):
 *   - LEMONSQUEEZY_WEBHOOK_SECRET — the signing secret from the LS webhook config.
 *   - Point the LS webhook at POST /api/lemonsqueezy/webhook and subscribe to
 *     order_created (and order_refunded).
 *   - To link a conversion to the same person the extension tracks, configure the
 *     checkout to carry the extension's analytics id as custom data
 *     (checkout[custom][did]=<distinct_id>); pro-popup.js appends it automatically.
 *
 * Node runtime: HMAC verification needs the raw request body + Node crypto.
 */
export const runtime = "nodejs";

const SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

function verifySignature(raw: string, signature: string | null): boolean {
  if (!SECRET || !signature) return false;
  const digest = createHmac("sha256", SECRET).update(raw).digest("hex");
  let a: Buffer;
  let b: Buffer;
  try {
    a = Buffer.from(digest, "hex");
    b = Buffer.from(signature, "hex");
  } catch {
    return false;
  }
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function capture(
  event: string,
  distinctId: string,
  properties: Record<string, unknown>
): Promise<void> {
  if (!POSTHOG_KEY) return; // analytics disabled — no-op, same contract as the client
  try {
    await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event,
        properties: { distinct_id: distinctId, ...properties },
      }),
    });
  } catch {
    /* best-effort: never fail the webhook because analytics is unreachable */
  }
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-signature");

  if (!verifySignature(raw, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: {
    meta?: { event_name?: string; custom_data?: Record<string, string> };
    data?: { id?: string; attributes?: Record<string, unknown> };
  };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;
  const custom = payload.meta?.custom_data ?? {};
  const attrs = (payload.data?.attributes ?? {}) as Record<string, unknown>;

  // Prefer the extension's analytics id (passed as checkout custom data) so the
  // conversion links to the same PostHog person; fall back to email, then order id.
  const distinctId =
    custom.did ||
    (attrs.user_email as string) ||
    `order_${payload.data?.id ?? "unknown"}`;

  if (eventName === "order_created") {
    await capture("checkout_completed", distinctId, {
      country: (attrs.country as string) ?? null,
      price_paid:
        (attrs.total_formatted as string) ??
        (attrs.total != null ? String(attrs.total) : null),
      currency: (attrs.currency as string) ?? null,
      $set: { is_pro: true },
    });
  } else if (eventName === "order_refunded") {
    await capture("pro_refunded", distinctId, {
      country: (attrs.country as string) ?? null,
      $set: { is_pro: false },
    });
  }

  return NextResponse.json({ received: true });
}
