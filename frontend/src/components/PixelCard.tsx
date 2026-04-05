import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps {
  variant?: "default" | "blue" | "orange" | "yellow";
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const VARIANTS = {
  default: "#f10707,#710606,#ff2222",
  blue: "#00b4ff,#0040ff,#00b4ff",
  orange: "#ff8c00,#ff6b35,#ff4500",
  yellow: "#ffff00,#ffcc00,#ffff00",
};

export const PixelCard = ({
  variant = "default",
  gap = 4,
  speed = 30,
  colors,
  className = "",
  children,
}: PixelCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const colorList = (colors || VARIANTS[variant]).split(",");

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isHovered) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += speed / 1000;

      const pxSize = gap;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      for (let x = 0; x < width; x += pxSize) {
        for (let y = 0; y < height; y += pxSize) {
          const n = Math.sin(x * 0.02 + y * 0.02 + time) * 0.5 + 0.5;
          if (n > 0.6) {
            const colorIdx = Math.floor(n * colorList.length) % colorList.length;
            ctx.fillStyle = colorList[colorIdx];
            ctx.fillRect(x, y, pxSize - 0.5, pxSize - 0.5);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, gap, speed, colors, variant]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden bg-black/60 border border-primary/20 hover:border-primary/60 transition-all duration-700 group",
        isHovered && "shadow-[0_0_40px_rgba(255,107,53,0.15)] scale-[1.01]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Moving border lines */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-horizontal" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-horizontal" />
        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-scan-vertical" />
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-scan-vertical" />
      </div>

      <div className="relative z-10">{children}</div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-all duration-300" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/40 group-hover:border-primary transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-all duration-300" />
    </div>
  );
};
