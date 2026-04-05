import { motion } from "framer-motion";
import { EventCard } from "./EventCard";

const events = [
  {
    slug: "neural-nexus-hackathon",
    title: "Neural Nexus Hackathon",
    date: "14 MARCH 2026",
    venue: "Cyber-Core Lab 4",
    description: "Welcome to Neural Nexus 2026, the premier competitive arena for neural engineers and quantum programmers. Tasked with bridging biological synapses and synthetic processors.",
    contacts: [
      { name: "ALEX RIVERA", phone: "+1 (555) 010-0420" },
      { name: "CHEN WEI", phone: "core_op@techfest.com" }
    ],
    variant: "purple" as const
  },
  {
    slug: "retrogrid-robotics",
    title: "Retrogrid Robotics Cup",
    date: "15 MARCH 2026",
    venue: "Mechatronics Bay",
    description: "Line-following and obstacle arenas with a synthwave twist. Bring your microcontrollers and nerve to the mechatronics arena.",
    contacts: [
      { name: "SAM OKONKWO", phone: "+1 (555) 010-7700" }
    ],
    variant: "orange" as const
  }
];

export const PremiumEventsSection = () => {
  const headingText = "EVENTS";

  return (
    <section id="events-section" className="relative w-full py-24 px-4 sm:px-6 flex flex-col items-center bg-[#05070d] overflow-hidden">
      {/* Top Transition Fade Overlay (Deep Blend) */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#05070d] via-[#05070d]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-[#05070d] z-0 pointer-events-none" />
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Elite Heading Section */}
      <div className="relative text-center mb-16 sm:mb-24 px-4 z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-pixel text-[8px] sm:text-[10px] tracking-[0.4em] text-muted-foreground uppercase mb-8"
        >
          IEEE STUDENT BRANCH · RIT CAMPUS
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.98, y: 20 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           whileHover={{ scale: 1.03 }}
           className="relative inline-flex group cursor-default"
        >
          {headingText.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: [20, -15, 0], 
              }}
              animate={{ 
                y: [0, -18, 0], 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                opacity: { delay: 0.3 + i * 0.1, duration: 0.6 },
                y: { 
                  delay: 0.3 + i * 0.1, 
                  duration: 1.8, 
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                },
                scale: {
                  delay: 0.3 + i * 0.1,
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }
              }}
              className="elite-heading-letter font-pixel text-4xl sm:text-6xl md:text-8xl font-bold tracking-[0.1em] px-1"
              style={{
                background: "linear-gradient(to right, #FF8C00, #FFD700, #FF4500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {letter}
            </motion.span>
          ))}
          
          {/* Looping scanglow effect (CSS) */}
          <div className="absolute -inset-12 bg-primary/10 blur-[100px] rounded-full opacity-40 animate-glow-pulse -z-10" />
        </motion.div>
      </div>

      {/* Cards Grid - 2 columns */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 px-4 justify-items-center">
        {events.map((event, index) => (
          <EventCard key={event.title} {...event} index={index} />
        ))}
      </div>
    </section>
  );
};
