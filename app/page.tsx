"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
// import FireworksElement from "./firework/fireworksElement";
const Firework = dynamic(() => import("./firework/fireworksElement"), { ssr: false })
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface Wish {
  id: string;
  message: string;
  timestamp: number;
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-01-29T00:00:00");

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    const wish: Wish = {
      id: crypto.randomUUID(),
      message: newWish.trim(),
      timestamp: Date.now()
    };

    setWishes(prev => [wish, ...prev]);
    setNewWish("");
  };

  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(timestamp));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-red-950 relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="pt-64"></div>
          <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-8 animate-fade-in">
            Chúc mừng năm mới
          </h1>
          <p className="text-2xl text-yellow-500 mb-12 animate-slide-up">
          Happy Lunar New Year 2025
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6"
            >
              <div className="text-4xl md:text-6xl font-bold text-yellow-400 tabular-nums">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-red-400 font-medium mt-2 capitalize">
                {unit}
              </div>
            </div>
          ))}
        </div>
        </div>
        <Firework />
        <div className="wish-container max-w-4xl w-full mx-auto mt-8 px-4">
          <section className="wish-input-section bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">Make with 💖 by quanvn</h2>
          </section>
        </div>
      </div>
    </main>
  );
}