"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { imagePaths, getImagePath } from "@/lib/image-paths"

const testimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Founder, BlockChain India",
    company: "Mumbai",
    image: imagePaths.testimonials.arjunSharma,
    rating: 5,
    content:
      "DaoConnect has revolutionized how we manage our community governance in India. The AI-powered insights help us make better decisions for our 10,000+ members.",
    highlight: "Increased participation by 300%",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "CTO, TechVentures Delhi",
    company: "New Delhi",
    image: imagePaths.testimonials.priyaPatel,
    rating: 5,
    content:
      "The cross-chain capabilities have allowed us to coordinate governance across multiple blockchain networks seamlessly. Perfect for the Indian crypto ecosystem.",
    highlight: "Saved 40 hours per week",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Lead Developer, CryptoInnovate",
    company: "Bangalore",
    image: imagePaths.testimonials.rajeshKumar,
    rating: 5,
    content:
      "Setting up our DAO took just minutes instead of weeks. The treasury management tools are incredibly powerful and user-friendly for Indian startups.",
    highlight: "Launched DAO in 15 minutes",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Product Manager, Web3 Solutions",
    company: "Hyderabad",
    image: imagePaths.testimonials.snehaGupta,
    rating: 5,
    content:
      "DaoConnect's mobile-first approach is perfect for India's mobile-heavy user base. Our community engagement has increased dramatically.",
    highlight: "85% mobile adoption",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Blockchain Consultant",
    company: "Pune",
    image: imagePaths.testimonials.vikramSingh,
    rating: 5,
    content:
      "The platform's support for multiple languages and Indian payment methods makes it accessible to our diverse community across India.",
    highlight: "Supports 8 Indian languages",
  },
  {
    id: 6,
    name: "Kavya Reddy",
    role: "Community Lead, DeFi India",
    company: "Chennai",
    image: imagePaths.testimonials.kavyaReddy,
    rating: 5,
    content:
      "Real-time analytics and governance insights have transformed how we understand our community's needs and preferences in the Indian market.",
    highlight: "Data-driven decisions",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
            <Star className="mr-2 h-4 w-4 fill-current" />
            Testimonials
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
              Trusted by Organizations
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Across India</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Join thousands of Indian organizations already using DaoConnect to revolutionize their governance
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">DAOs Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">₹50Cr+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Treasury Managed</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Testimonials Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 ${
                  hoveredCard === testimonial.id
                    ? "border-purple-300 dark:border-purple-600 shadow-xl"
                    : "border-gray-200 dark:border-gray-700"
                } bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Quote className="h-8 w-8 text-purple-500" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Highlight */}
                  <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                      🎯 {testimonial.highlight}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-700">
                        <Image
                          src={getImagePath(testimonial.image, imagePaths.placeholders.avatar) || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        📍 {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-600 dark:bg-purple-400 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-purple-300 dark:hover:bg-purple-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4 p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white shadow-2xl">
            <div className="flex-1 text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to join them?</h3>
              <p className="text-purple-100">Start your DAO journey today with DaoConnect</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
