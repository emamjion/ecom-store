"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 12,
    minutes: 55,
    seconds: 24,
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted:", email);
    setEmail("");
  };

  const handleReturnHome = () => {
    // Handle navigation to homepage
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-6">
          Coming Soon!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
          We couldn't find the page you were looking for. We suggest you return
          to homepage
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 my-12">
          <div className="bg-white border-2 border-red-300 rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl md:text-4xl font-bold text-black">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 mt-1">Days</div>
          </div>

          <div className="bg-white border-2 border-red-300 rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl md:text-4xl font-bold text-black">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 mt-1">Hours</div>
          </div>

          <div className="bg-white border-2 border-red-300 rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl md:text-4xl font-bold text-black">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 mt-1">Mins</div>
          </div>

          <div className="bg-white border-2 border-red-300 rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl md:text-4xl font-bold text-black">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-600 mt-1">Secs</div>
          </div>
        </div>

        {/* Email Subscription */}
        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
          <Button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200"
          >
            Get Notify
          </Button>
        </form>

        {/* Return to Homepage Button */}
        <div className="pt-8">
          <Button
            onClick={handleReturnHome}
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
