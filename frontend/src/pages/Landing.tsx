import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import Countdown from "@/components/Countdown";
import AsciiCity from "@/components/AsciiCity";
import FloatingElements from "@/components/FloatingElements";
import { lazy, Suspense, useEffect, useState } from "react";
import { PremiumEventsSection } from "@/components/PremiumEventsSection";
import Shuffle from "@/components/ui/Shuffle";
import { fetchEvents } from "@/api/client";
import type { TechfestEvent } from "@/types/event";

const DitherBackground = lazy(() => import("@/components/DitherBackground"));

export function Landing() {
  const [events, setEvents] = useState<TechfestEvent[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070d] selection:bg-primary/30">
      {/* Interactive dither background - Fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <DitherBackground
            waveSpeed={0.03}
            waveFrequency={4}
            waveAmplitude={0.25}
            waveColor={[0.8, 0.4, 0.1]}
            colorNum={4}
            pixelSize={3}
            enableMouseInteraction={true}
            mouseRadius={1.2}
          />
        </Suspense>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden pointer-events-none">
          <FloatingElements />
          
          <div className="flex flex-col items-center justify-center w-full">
            {/* Title Section (Decrypted Animation) */}
            <div className="relative text-center mb-12 sm:mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-pixel text-[10px] sm:text-xs tracking-[0.6em] text-primary/60 mb-8 uppercase"
                >
                  INITIALIZING UPLINK_2026
                </motion.p>
                
                <h1 className="leading-none uppercase tracking-tighter mb-4">
                  <Shuffle 
                    text="RIT" 
                    className="font-pixel text-5xl sm:text-8xl md:text-9xl text-primary neon-text-strong"
                    animationMode="random"
                    shuffleDirection="right"
                    shuffleTimes={3}
                    duration={0.8}
                    maxDelay={0.5}
                    colorFrom="#FFD700"
                    colorTo="#FF6B35"
                    scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                  />
                </h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="uppercase tracking-[0.3em]"
                >
                  <Shuffle 
                    text="TECH FEST" 
                    className="font-pixel text-lg sm:text-3xl md:text-4xl text-primary/90 neon-text"
                    animationMode="evenodd"
                    shuffleDirection="down"
                    shuffleTimes={2}
                    duration={0.6}
                    colorFrom="#FF8C00"
                    colorTo="#FFac1c"
                    scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                  />
                </motion.div>

                {/* Subtle horizontal glow line */}
                <div className="w-32 h-[1px] bg-primary/30 mt-12 animate-pulse" />
              </motion.div>
            </div>

            {/* Countdown */}
            <div className="pointer-events-auto">
              <Countdown />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex gap-4 mt-8 sm:mt-12 pointer-events-auto"
            >
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                className="font-pixel text-[10px] sm:text-xs bg-primary text-black px-8 py-4 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] animate-pulse-glow"
              >
                JOIN NOW
              </button>
              <button 
                onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-pixel text-[10px] sm:text-xs border border-primary/40 text-primary/70 px-8 py-4 hover:border-primary hover:text-primary transition-all backdrop-blur-sm"
              >
                EXPLORE DOSSIER
              </button>
            </motion.div>
          </div>

          <AsciiCity />

          {/* Deep Hero Bottom Fade */}
          <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-[#05070d] via-[#05070d]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[150px] bg-[#05070d] z-10 pointer-events-none" />
        </section>

        {/* Featured Events Section */}
        <div id="events-section" className="relative z-30">
          <PremiumEventsSection />
        </div>

        {/* Bottom Page Fade (Optional) */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#05070d] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
