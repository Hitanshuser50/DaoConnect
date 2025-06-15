import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/optimized/error-boundary"
import { MemoryMonitor } from "@/lib/optimized/memory-monitor"
import dynamic from "next/dynamic"

// Lazy load heavy components
const MemoryEfficientNavbar = dynamic(
  () =>
    import("@/components/optimized/memory-efficient-navbar").then((mod) => ({
      default: mod.MemoryEfficientNavbar,
    })),
  {
    ssr: true,
    loading: () => <div className="h-16 bg-background/80 backdrop-blur-md border-b" />,
  },
)

// Remove ssr: false for Server Components - let Next.js handle SSR by default
const Footer = dynamic(() => import("@/components/footer").then((mod) => ({ default: mod.Footer })), {
  loading: () => <div className="h-32 bg-muted" />,
})

// For wallet provider, we need a client component wrapper
const WalletProvider = dynamic(
  () => import("@/components/providers/wallet-provider").then((mod) => ({ default: mod.WalletProvider })),
  {
    loading: () => <div />, // Minimal loading state for provider
  },
)

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

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
  metadataBase: new URL("https://dao-connect.polkadot.network"),
  openGraph: {
    title: "Dao Connect - Polkadot DAO Platform",
    description: "Revolutionary DAO platform built on Polkadot ecosystem with cross-chain governance capabilities.",
    url: "https://dao-connect.polkadot.network",
    siteName: "Dao Connect",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dao Connect - Polkadot DAO Platform" }],
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
  robots: { index: true, follow: true },
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.polkadot.io" />
        <link rel="dns-prefetch" href="https://rpc.polkadot.io" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WalletProvider>
              <div className="min-h-screen bg-background flex flex-col">
                <MemoryEfficientNavbar />
                <main className="flex-1 relative">
                  <ErrorBoundary>{children}</ErrorBoundary>
                </main>
                <Footer />
              </div>
              <Toaster />
              {process.env.NODE_ENV === "development" && <MemoryMonitor />}
            </WalletProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}