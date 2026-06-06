import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.wwebcustomizer.com'), // DEINE ECHTE DOMAIN HIER
  title: "WhatsApp Web Customizer – Free & Open Source Extension",
  description:
    "Customize WhatsApp Web with themes, custom fonts, and a privacy blur. Free, open-source extension featured by MakeUseOf and TechPP. Make messaging yours.",
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
    title: "WhatsApp Web Customizer – Free & Open Source Extension",
    description:
      "Customize WhatsApp Web with themes, custom fonts, and a privacy blur. Free, open-source extension featured by MakeUseOf and TechPP. Make messaging yours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Web Customizer – Free & Open Source Extension",
    description:
      "Customize WhatsApp Web with themes, custom fonts, and a privacy blur. Free, open-source extension featured by MakeUseOf and TechPP. Make messaging yours.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/', // Das setzt den Canonical-Tag standardmässig auf die aktuelle URL
  },
  icons: {
    icon: [
    { url: '/logo32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/logo128x128.png', sizes: '128x128', type: 'image/png' },
    { url: '/logo192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/logo426x426.png', sizes: '426x426', type: 'image/png' },
    { url: '/logo512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  shortcut: '/favicon.ico', // Optional für alte Browser
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