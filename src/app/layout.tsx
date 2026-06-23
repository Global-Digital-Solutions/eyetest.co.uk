import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "eyetest.co.uk — Find & Book Eye Tests Near You",
  description:
    "Compare thousands of opticians across the UK. Find available eye test appointments near you from Boots, Specsavers, Vision Express, ASDA and independent opticians. Book online in seconds.",
  keywords: [
    "eye test",
    "book eye test",
    "opticians near me",
    "eye test appointment",
    "NHS eye test",
    "free eye test",
    "compare opticians",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "eyetest.co.uk — Find & Book Eye Tests Near You",
    description:
      "Compare thousands of opticians across the UK. Find available appointments and book online in seconds.",
    url: "https://www.eyetest.co.uk",
    siteName: "eyetest.co.uk",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WMXJ8JKD79"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WMXJ8JKD79');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-navy)]">
        {children}
      </body>
    </html>
  );
}
