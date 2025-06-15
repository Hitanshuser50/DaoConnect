// Centralized image path management
export const imagePaths = {
  testimonials: {
    arjunSharma: "/images/testimonials/arjun-sharma.jpg",
    priyaPatel: "/images/testimonials/priya-patel.jpg",
    rajeshKumar: "/images/testimonials/rajesh-kumar.jpg",
    snehaGupta: "/images/testimonials/sneha-gupta.jpg",
    vikramSingh: "/images/testimonials/vikram-singh.jpg",
    kavyaReddy: "/images/testimonials/kavya-reddy.jpg",
  },

  heroes: {
    heroBg: "/images/heroes/hero-bg.jpg",
    daoIllustration: "/images/heroes/dao-illustration.svg",
    governanceGraphic: "/images/heroes/governance-graphic.png",
    blockchainNetwork: "/images/heroes/blockchain-network.svg",
  },

  features: {
    aiGovernance: "/images/features/ai-governance.svg",
    crossChain: "/images/features/cross-chain.svg",
    securityShield: "/images/features/security-shield.svg",
    treasuryManagement: "/images/features/treasury-management.png",
    votingInterface: "/images/features/voting-interface.png",
    memberDashboard: "/images/features/member-dashboard.png",
  },

  logos: {
    daoConnectLogo: "/images/logos/daoconnect-logo.svg",
    daoConnectIcon: "/images/logos/daoconnect-icon.png",
    polkadotLogo: "/images/logos/polkadot-logo.svg",
    partners: {
      blockchainIndia: "/images/logos/partner-logos/blockchain-india.png",
      techVenturesDelhi: "/images/logos/partner-logos/techventures-delhi.png",
      cryptoInnovate: "/images/logos/partner-logos/cryptoinnovate.png",
      web3Solutions: "/images/logos/partner-logos/web3-solutions.png",
      defiIndia: "/images/logos/partner-logos/defi-india.png",
    },
  },

  backgrounds: {
    gradientMesh: "/images/backgrounds/gradient-mesh.svg",
    gridPattern: "/images/backgrounds/grid-pattern.svg",
    dotsPattern: "/images/backgrounds/dots-pattern.svg",
    wavePattern: "/images/backgrounds/wave-pattern.svg",
    abstractShapes: "/images/backgrounds/abstract-shapes.svg",
  },

  // Fallback placeholder images
  placeholders: {
    avatar: "/placeholder.svg?height=200&width=200",
    feature: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=100&width=200",
    background: "/placeholder.svg?height=1080&width=1920",
  },
} as const

// Helper function to get image with fallback
export function getImagePath(path: string, fallback?: string): string {
  return path || fallback || "/placeholder.svg?height=200&width=200"
}

// Type for image categories
export type ImageCategory = keyof typeof imagePaths
export type TestimonialImage = keyof typeof imagePaths.testimonials
export type HeroImage = keyof typeof imagePaths.heroes
export type FeatureImage = keyof typeof imagePaths.features
export type LogoImage = keyof typeof imagePaths.logos
export type BackgroundImage = keyof typeof imagePaths.backgrounds
