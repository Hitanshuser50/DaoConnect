import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"
import { WalletProvider } from "@/components/providers/wallet-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { FuturisticBackground } from "@/components/ui/futuristic-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dao Connect - Polkadot DAO Platform | Build the Future of Decentralized Governance",
  description:
    "Revolutionary DAO platform built on Polkadot ecosystem. Create, manage, and participate in cross-chain decentralized autonomous organizations with AI-powered governance, XCM integration, and seamless parachain connectivity.",
  keywords: [
    "Polkadot",
    "DAO",
    "Decentralized Governance",
    "Parachain",
    "XCM",
    "Substrate",
    "Web3",
    "Blockchain",
    "Cross-chain",
    "Asset Hub",
  ],
  authors: [{ name: "Dao Connect Team" }],
  creator: "Dao Connect",
  publisher: "Dao Connect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dao-connect.polkadot.network"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dao Connect - Polkadot DAO Platform",
    description: "Revolutionary DAO platform built on Polkadot ecosystem with cross-chain governance capabilities.",
    url: "https://dao-connect.polkadot.network",
    siteName: "Dao Connect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dao Connect - Polkadot DAO Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dao Connect - Polkadot DAO Platform",
    description: "Revolutionary DAO platform built on Polkadot ecosystem with cross-chain governance capabilities.",
    images: ["/og-image.png"],
    creator: "@DaoConnect",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FuturisticBackground />
          <WalletProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
