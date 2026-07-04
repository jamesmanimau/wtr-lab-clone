import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WTR-LAB - Read Light Novels in English Machine Translation",
  description: "Read English MTL (Machine Translation) Novels on WTR-LAB.com. All light novels here are translated from raw. Sign up to save your reading progress.",
  openGraph: {
    title: "WTR-LAB - Read Light Novels in English Machine Translation",
    description: "Read English MTL (Machine Translation) Novels on WTR-LAB.com. All light novels here are translated from raw.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Nunito+Sans:opsz,wght@6..12,200..1000&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/assets/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="wtr-lab" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
      </head>
      <body className="min-h-screen gradient-bg">
        {children}
      </body>
    </html>
  );
}
