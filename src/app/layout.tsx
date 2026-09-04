import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duo Glow - Belleza que inspira",
  description: "Catálogo de cosméticos y productos de belleza",
  applicationName: "Duo Glow",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Duo Glow - Belleza que inspira",
    description: "Catálogo de cosméticos y productos de belleza",
    siteName: "Duo Glow",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "Duo Glow",
      },
    ],
  },
};

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
