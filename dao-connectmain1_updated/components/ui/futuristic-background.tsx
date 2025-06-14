"use client"

export function FuturisticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base lavender background */}
      <div className="absolute inset-0 bg-[#EAE6FC]" />

      {/* Main radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D92B7E] via-[#00D8FF] to-transparent opacity-60 animate-pulse-slow" />

      {/* Secondary gradient overlay */}
      <div className="absolute inset-0 bg-gradient-conic from-[#D92B7E] via-[#00D8FF] to-[#D92B7E] opacity-30 animate-spin-slow" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D92B7E] rounded-full opacity-20 blur-3xl animate-float" />
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-[#00D8FF] rounded-full opacity-25 blur-2xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#2DFF5B] rounded-full opacity-15 blur-xl animate-bounce-slow" />

      {/* Dotted mesh patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-dot-pattern animate-drift" />
        <div className="absolute inset-0 bg-mesh-pattern opacity-50 animate-drift-reverse" />
      </div>

      {/* Neon green accent sparks */}
      <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-[#2DFF5B] rounded-full animate-ping" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#2DFF5B] rounded-full animate-ping animation-delay-1000" />
      <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-[#2DFF5B] rounded-full animate-pulse animation-delay-2000" />
      <div className="absolute top-1/4 right-1/5 w-1 h-1 bg-[#2DFF5B] rounded-full animate-ping animation-delay-3000" />
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#2DFF5B] rounded-full animate-pulse animation-delay-4000" />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

      {/* Motion blur effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2DFF5B] to-transparent animate-slide-right" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D92B7E] to-transparent animate-slide-left" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00D8FF] to-transparent animate-slide-right animation-delay-2000" />
      </div>

      {/* Blockchain node connections */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blockchain-nodes" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="#2DFF5B" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <line x1="50" y1="50" x2="100" y2="0" stroke="#00D8FF" strokeWidth="0.5" opacity="0.4" />
            <line x1="50" y1="50" x2="0" y2="100" stroke="#D92B7E" strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blockchain-nodes)" />
      </svg>
    </div>
  )
}
