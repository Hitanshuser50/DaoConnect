"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl",
        neon: "bg-primary text-primary-foreground shadow-glow hover:shadow-glow-lg border border-primary/20",
        glass: "glass text-foreground hover:bg-white/10 border border-white/20",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-3xl px-10 text-lg",
        icon: "h-12 w-12 rounded-2xl",
        "icon-sm": "h-9 w-9 rounded-xl",
        "icon-lg": "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  animated?: boolean
}

const ModernButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, animated = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const buttonContent = (
      <>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
        {variant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
      </>
    )

    if (animated) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Comp
            className={cn(buttonVariants({ variant, size, className }), "group")}
            ref={ref}
            disabled={loading}
            {...props}
          >
            {buttonContent}
          </Comp>
        </motion.div>
      )
    }

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={loading} {...props}>
        {buttonContent}
      </Comp>
    )
  },
)
ModernButton.displayName = "ModernButton"

export { ModernButton, buttonVariants }
