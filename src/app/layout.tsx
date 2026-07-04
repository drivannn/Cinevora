import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/shared/page-transition";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cinevora.local"),
  title: {
    default: "Cinevora - Cinematic Movie Discovery",
    template: "%s | Cinevora",
  },
  description:
    "A premium cinematic movie discovery experience powered by TMDB, built with Next.js 15.",
  openGraph: {
    title: "Cinevora",
    description: "Discover trending, popular, top rated, and upcoming films in a polished cinematic interface.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinevora",
    description: "Premium movie discovery powered by TMDB.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <Providers>
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
