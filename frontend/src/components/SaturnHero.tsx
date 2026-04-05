import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/saturn-hero.css'

/** 
 * SaturnHero - A planetary-themed hero section with space background,
 * rotating rings, and mouse-parallax movement for a "live" feel.
 * features a smooth "ball-to-text" conversion pulse.
 */
export function SaturnHero() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isTextMode, setIsTextMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    // Toggle between ball and text every 6 seconds
    const interval = setInterval(() => {
      setIsTextMode((prev) => !prev)
    }, 6000)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  /* ── generate a deterministic starfield ── */
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 140 - 20, // wider range for drift
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  }, [])

  /* parallax offsets */
  const planetStyle = {
    transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
  }
  const ringsStyle = {
    transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px) rotateX(75deg) rotateY(-15deg)`,
  }

  return (
    <section className="saturn-hero" ref={containerRef}>
      {/* ── Background Starfield ── */}
      <div className="stars-container">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Scanline Overlay ── */}
      <div className="absolute inset-0 scanline opacity-10 pointer-events-none z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 pointer-events-none z-[6]" />

      {/* ── Saturn Planetary Group ── */}
      <div className="saturn-container">
        <div className="rings-wrapper" style={ringsStyle}>
          <div className="rings-inner">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
            <div className="ring ring-4" />
            <div className="ring ring-5" />
          </div>
        </div>
        
        {/* The Planet Ball */}
        <div 
          className={`saturn-planet ${isTextMode ? 'saturn-planet--text-mode' : ''}`} 
          style={planetStyle} 
        />
        
        {/* The Morphed Text */}
        <div className={`saturn-planet-text ${isTextMode ? 'saturn-planet-text--active' : ''}`}>
          2026
        </div>
      </div>

      {/* ── Content Overlay ── */}
      <div className="saturn-hero__content">
        <p className="saturn-hero__tag">
          IEEE-AAVISHKAAR // THE TIMELINE SPRINT
        </p>
        <h1 className="saturn-hero__title mb-8">
          Journey beyond <br /> the threshold
        </h1>
        <p className="saturn-hero__desc">
          Navigate through 2026's most ambitious engineering symposium.
          A multidimensional deep dive into the technologies shaping human evolution.
        </p>

        <div className="saturn-hero__actions">
          <a
            href="#featured-protocols"
            className="saturn-hero__btn-primary"
          >
            Terminal Access
          </a>
          <Link
            to="/events"
            className="saturn-hero__btn-secondary"
          >
            Catalog Registry
          </Link>
        </div>
      </div>

      {/* ── HUD / Decorative UI ── */}
      <div className="saturn-hud saturn-hud--tl">
        CORE_SYS: OPTIMAL<br />
        NET: 042-SIGMA
      </div>
      <div className="saturn-hud saturn-hud--tr">
        COORD: 34.0522°N<br />
        LNG: 118.2437°W
      </div>
      <div className="saturn-hud saturn-hud--bl">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
          <span>DATA_LINK_ACTIVE</span>
        </div>
        // SCANNING_HORIZON
      </div>
      <div className="saturn-hud saturn-hud--br">
        VER: 2026.SINGULARITY<br />
        MEM: 100%_COMMIT
      </div>

      {/* ── Scroll Indicator ── */}
      {!hasScrolled && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-pulse">
          <span className="font-mono text-[9px] tracking-widest uppercase">Scroll to descend</span>
          <div className="w-px h-12 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
        </div>
      )}
    </section>
  )
}
