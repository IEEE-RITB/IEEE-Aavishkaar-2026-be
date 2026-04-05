import { Link } from 'react-router-dom';
import type { TechfestEvent } from '../types/event';
import { capacityPercent } from '../mocks/events';
import { PixelCard } from './PixelCard';
import { motion } from 'framer-motion';

/** Two large featured event cards - Modern Retro vibe with animated pixel hover effect */
export function LandingFeaturedEvents({ events }: { events: TechfestEvent[] }) {
  const pair = events.slice(0, 2);
  if (pair.length === 0) return null;

  return (
    <section
      id="featured-protocols"
      className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-20 scroll-mt-24"
      aria-labelledby="landing-featured-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="font-pixel text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-2">
            // PROTOCOL_SELECTION
          </p>
          <h2
            id="landing-featured-heading"
            className="font-pixel text-primary text-2xl md:text-3xl font-bold tracking-tight uppercase"
          >
            Featured Dossiers
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-3 max-w-xl font-mono">
            High-priority events matching your clearance level. Initialize registration 
            to secure your uplink slots.
          </p>
        </div>
        <Link
          to="/events"
          className="font-pixel text-[10px] text-primary hover:text-primary/70 underline underline-offset-4 decoration-primary/30 transition-all shrink-0"
        >
          VIEW ALL SYSTEMS →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {pair.map((e, idx) => {
          const poster =
            e.posterURL ??
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80';
          const pct = capacityPercent(e);
          
          return (
            <motion.div
              key={e.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PixelCard 
                variant="orange" 
                gap={5} 
                speed={40} 
                className="group border-primary/20 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(255,140,0,0.15)] bg-black/60"
              >
                <div className="flex flex-col sm:flex-row min-h-[220px]">
                  {/* Poster image */}
                  <div className="relative w-full sm:w-[40%] aspect-[4/5] sm:aspect-auto overflow-hidden border-b sm:border-b-0 sm:border-r border-primary/20">
                    <img 
                      src={poster} 
                      alt={e.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
                    
                    {/* Status badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 border border-primary/30 backdrop-blur-md">
                      <span className="font-pixel text-[8px] text-primary animate-pulse">
                        {e.registrationStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4 bg-transparent">
                    <div className="space-y-1">
                      <h3 className="font-pixel text-primary text-lg sm:text-xl leading-tight uppercase group-hover:text-primary transition-colors">
                        {e.title}
                      </h3>
                      {e.tagline && (
                        <p className="text-muted-foreground text-[10px] font-mono line-clamp-1 italic">
                          {e.tagline}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[10px] text-primary/70">
                      <span className="flex-none px-2 py-0.5 border border-primary/20 bg-primary/5">
                        DATE: {new Date(e.dateTime).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Capacity bar */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex justify-between items-end font-mono text-[9px] uppercase tracking-wider">
                        <span className="text-muted-foreground leading-none">Uplink Capacity</span>
                        <span className="text-primary leading-none">{pct}% SECURED</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 border border-primary/10 overflow-hidden relative">
                        <motion.div
                          className="h-full bg-primary relative"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <Link
                        to={`/events/${e.slug}`}
                        className="flex-1 text-center font-pixel text-[9px] py-2.5 bg-primary text-black hover:brightness-110 active:translate-y-px transition-all shadow-[0_0_15px_rgba(255,140,0,0.2)]"
                      >
                        OPEN Dossier
                      </Link>
                      <Link
                        to={`/events/${e.slug}/register`}
                        className="flex-1 text-center font-pixel text-[9px] py-2.5 border border-primary/40 text-primary/80 hover:border-primary hover:text-primary transition-all bg-black/40"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </PixelCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
