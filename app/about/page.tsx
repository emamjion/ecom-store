"use client";

import {
  CheckCircle,
  DollarSign,
  Headphones,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Store,
  Truck,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// Counter hook for animated numbers
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return { count, ref };
}

// Auto-sliding carousel hook
function useAutoSlider(itemsLength: number, interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsLength);
    }, interval);

    return () => clearInterval(timer);
  }, [itemsLength, interval]);

  return currentIndex;
}

export default function AboutPage() {
  // Stats data
  const stats = [
    { icon: DollarSign, label: "Total Sales", value: 50000, suffix: "+" },
    {
      icon: ShoppingBag,
      label: "Products",
      value: 150000,
      suffix: "+",
    },
    { icon: Users, label: "Happy Customers", value: 25000, suffix: "+" },
    { icon: Store, label: "Trusted Vendors", value: 500, suffix: "+" },
  ];

  // Services data
  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50 worldwide",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment with SSL encryption",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round the clock customer support via chat",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      image: "/client1.webp?height=60&width=60",
      rating: 5,
      text: "Amazing shopping experience! The quality of products is outstanding and delivery is always on time. Highly recommended for anyone looking for quality products.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      image: "/client2.webp?height=60&width=60",
      rating: 5,
      text: "I've been shopping here for over 2 years. The customer service is exceptional and they have the best prices in the market. Truly a reliable platform.",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Fashion Enthusiast",
      image: "/client3.webp?height=60&width=60",
      rating: 5,
      text: "Love the variety of products available. From electronics to fashion, everything is top quality. My go-to online store for all my shopping needs!",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Tech Professional",
      image: "/client4.png?height=60&width=60",
      rating: 5,
      text: "Fast shipping, great prices, and excellent customer support. What more could you ask for? Definitely 5 stars and highly recommended!",
    },
  ];

  // Team data
  const team = [
    {
      id: 1,
      name: "John Smith",
      role: "CEO & Founder",
      image: "/member3.webp?height=200&width=200",
      bio: "Leading the company with 10+ years of e-commerce experience",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "CTO",
      image: "/member5.webp?height=200&width=200",
      bio: "Technology expert ensuring smooth platform operations",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Head of Marketing",
      image: "/member1.webp?height=200&width=200",
      bio: "Creative marketing strategies to reach more customers",
    },
    {
      id: 4,
      name: "Lisa Brown",
      role: "Customer Success Manager",
      image: "/member4.webp?height=200&width=200",
      bio: "Ensuring every customer has the best shopping experience",
    },
    {
      id: 5,
      name: "Tom Wilson",
      role: "Operations Manager",
      image: "/member2.webp?height=200&width=200",
      bio: "Managing logistics and ensuring timely deliveries",
    },
  ];

  // Auto-sliding for testimonials and team
  const currentTestimonial = useAutoSlider(testimonials.length, 4000);
  const currentTeamIndex = useAutoSlider(team.length, 3500);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-sm font-medium">
              About Our Company
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Do You Want To <span className="text-primary">Know Us?</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're passionate about creating exceptional shopping experiences
              through innovation, quality, and customer-first approach.
            </p>
            <Button size="lg" className="mb-12">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const { count, ref } = useCountUp(stat.value);
              const Icon = stat.icon;

              return (
                <div key={index} ref={ref} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {count.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge variant="outline">Our Story</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  Transforming Online Shopping Since 2020
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Founded with a vision to revolutionize e-commerce, we
                    started as a small team of passionate individuals who
                    believed that online shopping could be better, faster, and
                    more enjoyable.
                  </p>
                  <p>
                    Today, we've grown into a trusted platform serving customers
                    worldwide, offering carefully curated products from
                    electronics and fashion to home essentials and beyond.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "Quality products from trusted vendors",
                    "Exceptional customer service",
                    "Fast and reliable shipping",
                    "Secure payment processing",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Card className="overflow-hidden">
                  <Image
                    src="/d1.webp?height=500&width=600"
                    alt="Our Story"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Our Services
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                We provide comprehensive services to ensure your shopping
                experience is seamless and enjoyable.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-slate-50/50"
                  >
                    <CardContent className="p-0 space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Testimonials
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-slate-600">
                Don't just take our word for it - hear from our satisfied
                customers.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <Card className="bg-white shadow-sm border-0">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <blockquote className="text-slate-700 text-lg leading-relaxed mb-6">
                          "{testimonial.text}"
                        </blockquote>
                        <div className="flex items-center space-x-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-semibold text-slate-900">
                              {testimonial.name}
                            </div>
                            <div className="text-slate-600 text-sm">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Testimonial indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-primary w-8"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Our Team
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Meet the People Behind Our Success
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Our diverse team of experts is dedicated to providing you with
                the best shopping experience.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentTeamIndex * (100 / 3)}%)`,
                }}
              >
                {team.map((member) => (
                  <div key={member.id} className="w-1/3 flex-shrink-0 px-3">
                    <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-slate-50/50">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            width={120}
                            height={120}
                            className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
                          />
                        </div>
                        <CardTitle className="text-lg mb-1">
                          {member.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mb-3 text-xs">
                          {member.role}
                        </Badge>
                        <CardDescription className="text-sm leading-relaxed">
                          {member.bio}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-[url('/banner-17.jpg')] bg-cover bg-center ">
        <div className="absolute inset-0 bg-black/80 z-0"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Shopping Journey?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing
              products at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/products"}>
                <Button size="lg" variant="secondary">
                  Shop Now
                </Button>
              </Link>
              <Link href={"/contact"}>
                <Button
                  size="lg"
                  className="border border-slate-200 text-white hover:bg-white hover:text-black duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
