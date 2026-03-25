import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WWeb Customizer - Transform Your WhatsApp Web Experience",
  description:
    "Customize WhatsApp Web with themes, shortcuts, and smart features. Make messaging yours with this free, open-source browser extension.",
  keywords: [
    "WhatsApp Web",
    "browser extension",
    "customization",
    "productivity",
    "themes",
    "WhatsApp",
  ],
  authors: [{ name: "WWeb Customizer" }],
  creator: "WWeb Customizer",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WWeb Customizer",
    title: "WWeb Customizer - Transform Your WhatsApp Web Experience",
    description:
      "Customize WhatsApp Web with themes, shortcuts, and smart features. Make messaging yours with this free, open-source browser extension.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WWeb Customizer - Transform Your WhatsApp Web Experience",
    description:
      "Customize WhatsApp Web with themes, shortcuts, and smart features. Make messaging yours with this free, open-source browser extension.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
