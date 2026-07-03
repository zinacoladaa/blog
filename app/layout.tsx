import type { Metadata } from "next";
import { Playfair_Display, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kitchen Passport",
  description:
    "Home cooking, comfort food, and the stories behind dishes from every corner of the globe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${jbmono.variable}`}>
      <body className="font-body antialiased">
        <header className="border-b border-parchment/20 px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-display text-2xl tracking-tight">
            Kitchen Passport
          </a>
          <nav className="font-mono text-xs uppercase tracking-widest flex gap-6 text-parchment/70">
            <a href="/recipes" className="hover:text-gold transition-colors">
              All Recipes
            </a>
            <a href="/regions" className="hover:text-gold transition-colors">
              Regions
            </a>
            <a href="/blog" className="hover:text-gold transition-colors">
              Blog
            </a>
            <a href="/about" className="hover:text-gold transition-colors">
              About
            </a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-parchment/20 px-6 py-8 mt-24 font-mono text-xs text-parchment/50">
          Kitchen Passport — a kitchen journal, one country at a time.
        </footer>
      </body>
    </html>
  );
}
