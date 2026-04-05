import { Link } from 'react-router-dom'
import type { TechfestEvent } from '../../types/event'
import { capacityPercent } from '../../mocks/events'

const statusStyles: Record<string, string> = {
  OPEN: 'text-secondary-container border-secondary-container/40',
  CLOSED: 'text-on-surface-variant border-outline-variant/40',
  FULL: 'text-error border-error/40',
}

export function EventCard({ event }: { event: TechfestEvent }) {
  const pct = capacityPercent(event)
  const poster =
    event.posterURL ??
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80'

  return (
    <article className="group bg-surface-container-high/50 backdrop-blur-md border border-outline-variant/15 overflow-hidden rounded-lg hover:border-secondary-container/40 hover:shadow-[0_0_24px_rgba(0,210,253,0.12)] transition-all duration-150 hover:scale-[1.02]">
      <Link to={`/events/${event.slug}`} className="block focus-visible:outline-none">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <span
            className={`absolute top-3 right-3 text-[10px] font-headline tracking-widest uppercase px-2 py-1 border rounded-sm bg-background/80 ${statusStyles[event.registrationStatus]}`}
          >
            {event.registrationStatus}
          </span>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-headline text-lg font-bold text-on-surface leading-tight">
            {event.title}
          </h3>
          {event.tagline ? (
            <p className="text-sm text-on-surface-variant/80 line-clamp-2">
              {event.tagline}
            </p>
          ) : null}
          <p className="text-xs font-mono text-secondary-container/90">
            {new Date(event.dateTime).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
          <div className="h-1.5 w-full bg-background border border-secondary-container/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-container to-secondary-container"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-on-surface-variant">
            {event.registrationCount ?? 0} / {event.maxCapacity} registered
          </p>
        </div>
      </Link>
    </article>
  )
}
