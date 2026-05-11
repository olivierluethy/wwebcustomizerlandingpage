export type NotificationKind =
  | "install"
  | "theme"
  | "community"
  | "upgrade"
  | "milestone";

export type LiveNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  meta?: string;
  emoji?: string;
};

export type NotificationTemplate = {
  weight?: number;
  build: () => Omit<LiveNotification, "id">;
};

const FIRST_NAMES = [
  "Lucas", "Mia", "Noah", "Sofia", "Liam", "Emma", "Mateo", "Aiko",
  "Yuki", "Aarav", "Hugo", "Lea", "Theo", "Ines", "Oliver", "Amélie",
  "Jonas", "Clara", "Felix", "Maya", "Eitan", "Nora", "Ravi", "Lia",
  "Ben", "Jana", "Nico", "Selin", "Andrei", "Marta",
] as const;

const COUNTRIES = [
  "Germany", "France", "Spain", "Brazil", "Japan", "India", "USA",
  "Canada", "UK", "Italy", "Mexico", "Netherlands", "Switzerland",
  "Singapore", "Sweden", "Australia", "South Korea", "Portugal",
  "Austria", "Poland", "Ireland",
] as const;

const THEMES = [
  "Glass Theme", "Midnight Theme", "Productivity Mode",
  "Dark+ Theme", "Aurora Theme", "Focus Theme", "Minimal Theme",
] as const;

const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const id = () => Math.random().toString(36).slice(2, 9);

export const NOTIFICATION_POOL: NotificationTemplate[] = [
  {
    weight: 3,
    build: () => ({
      kind: "install",
      title: "+1 new install",
      meta: "Chrome Web Store",
      emoji: "⚡",
    }),
  },
  {
    weight: 2,
    build: () => ({
      kind: "theme",
      title: `${pick(FIRST_NAMES)} from ${pick(COUNTRIES)} activated ${pick(THEMES)}`,
      meta: "Just now",
      emoji: "🎨",
    }),
  },
  {
    weight: 2,
    build: () => ({
      kind: "community",
      title: "New member joined the Discord",
      meta: "Community · live",
      emoji: "💬",
    }),
  },
  {
    weight: 1,
    build: () => ({
      kind: "theme",
      title: "Dark+ Theme enabled",
      meta: `${pick(FIRST_NAMES)} · ${pick(COUNTRIES)}`,
      emoji: "🌙",
    }),
  },
  {
    weight: 2,
    build: () => ({
      kind: "milestone",
      title: "5 users installed in the last hour",
      meta: "Live trend",
      emoji: "📈",
    }),
  },
  {
    weight: 2,
    build: () => ({
      kind: "upgrade",
      title: `${pick(FIRST_NAMES)} upgraded their WhatsApp UI`,
      meta: `${pick(COUNTRIES)} · just now`,
      emoji: "✨",
    }),
  },
  {
    weight: 2,
    build: () => ({
      kind: "community",
      title: `${pick(FIRST_NAMES)} from ${pick(COUNTRIES)} joined the community`,
      meta: "Discord",
      emoji: "👋",
    }),
  },
  {
    weight: 1,
    build: () => ({
      kind: "install",
      title: `${pick(FIRST_NAMES)} switched from default WhatsApp Web`,
      meta: `${pick(COUNTRIES)}`,
      emoji: "🔁",
    }),
  },
  {
    weight: 1,
    build: () => ({
      kind: "theme",
      title: "Theme pack downloaded",
      meta: `${pick(FIRST_NAMES)} · ${pick(COUNTRIES)}`,
      emoji: "📦",
    }),
  },
  {
    weight: 2,
    build: () => ({
      kind: "milestone",
      title: "High activity detected",
      meta: "Last 60 minutes",
      emoji: "🔥",
    }),
  },
  {
    weight: 1,
    build: () => ({
      kind: "theme",
      title: `${pick(FIRST_NAMES)} customizing chats right now`,
      meta: `${pick(COUNTRIES)}`,
      emoji: "✏️",
    }),
  },
  {
    weight: 1,
    build: () => ({
      kind: "milestone",
      title: "Productivity Mode activated",
      meta: "+27 users today",
      emoji: "⚡",
    }),
  },
];

export function nextNotification(
  pool: NotificationTemplate[] = NOTIFICATION_POOL,
  recent: ReadonlySet<string> = new Set(),
): LiveNotification {
  const eligible = pool.filter((t) => !recent.has(t.build.toString()));
  const list = eligible.length ? eligible : pool;
  const total = list.reduce((s, t) => s + (t.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const t of list) {
    r -= t.weight ?? 1;
    if (r <= 0) return { ...t.build(), id: id() };
  }
  return { ...list[0].build(), id: id() };
}
