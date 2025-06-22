"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Up to 50% Off on Selected Items",
    description:
      "Discover the latest trends in fashion with our exclusive summer collection",
    image: "/cloth.png",
    buttonText: "Shop Now",
    buttonLink: "/summer-collection",
    badge: "New Arrival",
  },
  {
    id: 2,
    title: "Electronics Sale",
    subtitle: "Best Deals on Tech Gadgets",
    description:
      "Get the latest smartphones, laptops, and accessories at unbeatable prices",
    image: "/headphone.png?height=600&width=1200",
    buttonText: "Explore Deals",
    buttonLink: "/electronics",
    badge: "Limited Time",
  },
  {
    id: 3,
    title: "Home & Living",
    subtitle: "Transform Your Space",
    description:
      "Beautiful furniture and decor items to make your house a home",
    image: "/watch.png?height=600&width=1200",
    buttonText: "Browse Collection",
    buttonLink: "/home-living",
    badge: "Featured",
  },
];

export default function EcommerceSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  return (
    <div className="relative w-full">
      {/* Main Slider Container */}
      <div
        className="relative h-[500px] md:h-[700px] overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-200"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto px-4 md:px-6">
                  <div className="max-w-2xl space-y-4 text-white">
                    {slide.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        {slide.badge}
                      </Badge>
                    )}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-gray-200">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg text-gray-300 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        {slide.buttonText}
                      </Button>
                      <Button size="lg" className="w-full sm:w-auto">
                        Browse Categories
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-white/20 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-white/20 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
