import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeUnit {
  value: string;
  label: string;
}

const Countdown = () => {
  const [time, setTime] = useState<TimeUnit[]>([]);

  useEffect(() => {
    // Set target to 10 days from now for demo
    const target = new Date();
    target.setDate(target.getDate() + 10);
    target.setHours(0, 0, 0, 0);

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTime([
          { value: "00", label: "DAYS" },
          { value: "00", label: "HOURS" },
          { value: "00", label: "MINUTES" },
          { value: "00", label: "SECONDS" },
        ]);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime([
        { value: String(days).padStart(2, "0"), label: "DAYS" },
        { value: String(hours).padStart(2, "0"), label: "HOURS" },
        { value: String(minutes).padStart(2, "0"), label: "MINUTES" },
        { value: String(seconds).padStart(2, "0"), label: "SECONDS" },
      ]);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="pixel-border rounded-sm bg-card/80 backdrop-blur-sm px-6 py-5 sm:px-10 sm:py-6"
    >
      <p className="text-center font-pixel text-xs sm:text-sm tracking-[0.3em] text-primary neon-text mb-4">
        COUNTDOWN
      </p>
      <div className="flex items-center gap-3 sm:gap-6">
        {time.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="font-pixel text-2xl sm:text-5xl text-primary neon-text-strong tabular-nums">
                {unit.value}
              </span>
              <span className="font-pixel text-[8px] sm:text-[10px] text-muted-foreground mt-2 tracking-widest">
                {unit.label}
              </span>
            </div>
            {i < time.length - 1 && (
              <span className="font-pixel text-2xl sm:text-4xl text-primary/40 -mt-4">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Countdown;
