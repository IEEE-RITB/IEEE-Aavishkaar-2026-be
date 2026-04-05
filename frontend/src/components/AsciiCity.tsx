import { motion } from "framer-motion";

const cityLines = [
  "                    ████                    ",
  "                   ██████                   ",
  "                  ████████                  ",
  "               █ ██████████ █              ",
  "              ███████████████              ",
  "         █   █████████████████   █         ",
  "        ███ ███████████████████ ███        ",
  "       ██████████████████████████████      ",
  "      ████████████████████████████████     ",
  "     ██████████████████████████████████    ",
  "    ████████████████████████████████████   ",
  "   ██████████████████████████████████████  ",
  "  ████████████████████████████████████████ ",
  " ██████████████████████████████████████████",
  "████████████████████████████████████████████",
];

const AsciiCity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1.2 }}
      className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
    >
      <pre className="font-pixel text-[4px] sm:text-[6px] md:text-[8px] leading-tight text-primary/30 text-center whitespace-pre">
        {cityLines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.05 }}
            className="block"
          >
            {line}
          </motion.span>
        ))}
      </pre>
    </motion.div>
  );
};

export default AsciiCity;
