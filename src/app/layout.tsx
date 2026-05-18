import "./globals.css"
import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import Header from "@/lib/components/header"
import Footer from "@/lib/components/footer"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://iamcaribbeing.com"),
  title: {
    default: "I AM CARIBBEING — A Lifestyle Brand Redefining Caribbean Culture",
    template: "%s · I AM CARIBBEING",
  },
  description:
    "Caribbeing is a Brooklyn-born lifestyle brand at the crossroads of film + art + culture. Shop varsity sweatshirts, food tings, body care, books and Caribbean-rooted goods from Little Caribbean NYC.",
  openGraph: {
    type: "website",
    siteName: "I AM CARIBBEING",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-cream text-ink antialiased">
        {/* Scroll-driven reading-progress bar (native CSS scroll timeline) */}
        <div
          aria-hidden
          className="scroll-progress fixed top-0 left-0 right-0 z-[60] h-[3px] bg-flame"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
