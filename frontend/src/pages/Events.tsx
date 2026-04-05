import { useEffect, useMemo, useState } from 'react'
import { EventCatalogMotion } from '../components/EventCatalogMotion'
import { EventCard } from '../components/ui/EventCard'
import { fetchEvents } from '../api/client'
import type { TechfestEvent } from '../types/event'

export function Events() {
  const [events, setEvents] = useState<TechfestEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'OPEN'>('ALL')

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  const visible = useMemo(() => {
    if (filter === 'OPEN') return events.filter((e) => e.registrationStatus === 'OPEN')
    return events
  }, [events, filter])

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
      <div className="mb-6">
        <p className="font-headline text-[10px] tracking-[0.35em] uppercase text-secondary-container/80 mb-2">
          // events.index
        </p>
        <h1 className="font-display font-black text-4xl md:text-6xl text-on-surface tracking-tight">
          Event <span className="text-primary-container">catalog</span>
        </h1>
        <p className="mt-3 text-on-surface-variant max-w-2xl">
          Browse open protocols. Capacity and status update in real time when the API is
          connected.
        </p>
        <div className="flex gap-2 mt-6">
          {(['ALL', 'OPEN'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-sm font-headline text-xs tracking-widest uppercase border transition-colors ${
                filter === f
                  ? 'border-primary-container bg-primary-container/15 text-primary-container'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-secondary-container/40'
              }`}
            >
              {f === 'ALL' ? 'All' : 'Open only'}
            </button>
          ))}
        </div>
      </div>

      <EventCatalogMotion events={events.length ? events : visible} />

      <div className="mt-12">
        {loading ? (
          <p className="font-mono text-secondary-container animate-pulse">Loading events…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        )}
        {!loading && visible.length === 0 ? (
          <p className="text-on-surface-variant font-mono text-sm">No events match.</p>
        ) : null}
      </div>
    </div>
  )
}
