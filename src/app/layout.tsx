import type { Metadata } from "next";
import { Poppins, Great_Vibes } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Flower from "@/components/Flower";
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

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${poppins.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="relative flex min-h-full flex-1 flex-col overflow-x-clip bg-gradient-to-br from-rosa-palido to-rosa-suave px-10 sm:px-14">
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-dorado-medio via-dorado-palido to-dorado-medio" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-dorado-medio via-dorado-palido to-dorado-medio" />

          <div className="pointer-events-none absolute inset-y-0 left-[3px] flex flex-col items-center justify-around -translate-x-1/2 py-6">
            <Flower className="h-12 w-12 text-rosa-fuerte sm:h-16 sm:w-16" />
            <Flower className="h-12 w-12 text-rosa-fuerte sm:h-16 sm:w-16" />
            <Flower className="h-12 w-12 text-rosa-fuerte sm:h-16 sm:w-16" />
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-[3px] flex flex-col items-center justify-around translate-x-1/2 py-6">
            <Flower className="h-12 w-12 text-rosa-fuerte sm:h-16 sm:w-16" />
            <Flower className="h-12 w-12 text-rosa-fuerte sm:h-16 sm:w-16" />
            <Flower className="h-12 w-12 text-rosa-fuerte sm:h-16 sm:w-16" />
          </div>

          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}