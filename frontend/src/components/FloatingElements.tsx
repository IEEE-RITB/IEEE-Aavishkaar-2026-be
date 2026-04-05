import { motion } from "framer-motion";

const elements = [
  { x: "15%", y: "20%", delay: 0, text: "SHARE", size: "text-xs sm:text-sm" },
  { x: "75%", y: "25%", delay: 0.3, text: "WIN", size: "text-xs sm:text-sm" },
  { x: "10%", y: "70%", delay: 0.6, text: "✦", size: "text-lg" },
  { x: "85%", y: "65%", delay: 0.9, text: "⚡", size: "text-lg" },
  { x: "50%", y: "15%", delay: 1.2, text: "★", size: "text-sm" },
  { x: "30%", y: "80%", delay: 0.4, text: "+", size: "text-sm" },
  { x: "90%", y: "40%", delay: 0.7, text: "◆", size: "text-xs" },
];

const FloatingElements = () => {
  return (
    <>
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute font-pixel ${el.size} text-primary/40 pointer-events-none select-none`}
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 6,
            delay: el.delay + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.text}
        </motion.div>
      ))}
    </>
  );
};

export default FloatingElements;
