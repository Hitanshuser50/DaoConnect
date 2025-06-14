import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dao Connect</h3>
            <p className="max-w-xs text-sm text-gray-500">
              Building the future of decentralized governance on the Polkadot ecosystem.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com" className="text-gray-500 hover:text-gray-900">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-500 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:underline">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:underline">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="hover:underline">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:underline">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:underline">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Dao Connect. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
