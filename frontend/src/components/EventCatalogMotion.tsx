import { Link } from 'react-router-dom'
import type { TechfestEvent } from '../types/event'

/**
 * Full-width marquee of event cards — reuse on Landing (compact) and Events page.
 * Duplicated content enables seamless loop; speed tuned for subtle retro ticker feel.
 */
export function EventCatalogMotion({
  events,
  compact = false,
}: {
  events: TechfestEvent[]
  compact?: boolean
}) {
  if (!events.length) return null

  const row = [...events, ...events]

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-secondary-container/15 bg-surface-container-lowest/50 ${
        compact ? 'py-3' : 'py-6'
      }`}
      aria-label="Event catalog preview"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-catalog-marquee hover:[animation-play-state:paused]">
        {row.map((e, i) => (
          <Link
            key={`${e.slug}-${i}`}
            to={`/events/${e.slug}`}
            className={`shrink-0 mx-3 flex items-stretch rounded-sm border border-outline-variant/20 bg-surface-container-high/60 backdrop-blur-sm hover:border-primary-container/50 hover:shadow-[0_0_20px_rgba(255,107,53,0.2)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-container ${
              compact ? 'w-52' : 'w-64'
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-l-sm bg-surface-container ${
                compact ? 'w-16' : 'w-20'
              } shrink-0`}
            >
              <img
                src={
                  e.posterURL ??
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80'
                }
                alt=""
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <div className="py-2 px-3 min-w-0 flex flex-col justify-center">
              <p className="font-headline text-[10px] tracking-widest uppercase text-secondary-container/80 truncate">
                {e.registrationStatus}
              </p>
              <p className="font-headline font-bold text-sm text-on-surface truncate">
                {e.title}
              </p>
              <p className="text-[10px] font-mono text-on-surface-variant truncate">
                {new Date(e.dateTime).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
