import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SectionHeader } from '../components/ui/SectionHeader'
import { fetchEventBySlug } from '../api/client'
import { capacityPercent } from '../mocks/events'
import type { TechfestEvent } from '../types/event'
import { EventDetailLiveBg } from '../components/event-detail/EventDetailLiveBg'
import { EventPdaSidebar } from '../components/event-detail/EventPdaSidebar'
import { RulesWin95Panel } from '../components/event-detail/RulesWin95Panel'

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [payload, setPayload] = useState<{
    forSlug: string
    event: TechfestEvent | null
  } | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    fetchEventBySlug(slug).then((e) => {
      if (!cancelled) setPayload({ forSlug: slug, event: e })
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  const loading = Boolean(slug && (!payload || payload.forSlug !== slug))
  const event = slug && payload?.forSlug === slug ? payload.event : undefined

  if (!slug) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-on-surface-variant mb-6">Invalid event link.</p>
        <Link to="/events" className="text-primary-container font-headline uppercase text-sm">
          ← Back to catalog
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 font-mono text-secondary-container">
        Loading protocol…
      </div>
    )
  }

  if (!event) {
    return (
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-on-surface-variant mb-6">Event not found.</p>
        <Link to="/events" className="text-primary-container font-headline uppercase text-sm">
          ← Back to catalog
        </Link>
      </div>
    )
  }

  const hero =
    event.posterURL ??
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80'
  const pct = capacityPercent(event)
  const canRegister = event.registrationStatus === 'OPEN' && pct < 100

  return (
    <div className="relative min-h-screen">
      <EventDetailLiveBg />

      <section className="relative z-10 min-h-[420px] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0 overflow-hidden" 
             style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)' }}>
          <img src={hero} alt="" className="w-full h-full object-cover opacity-60" />
          {/* Frosted Glass / Fog Effect for definitive fade */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-background/40 backdrop-blur-3xl z-10" 
               style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
          <div className="absolute inset-0 mix-blend-overlay bg-primary-container/5 pointer-events-none" />
          <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pb-10">
          <nav className="flex mb-4 text-xs font-label tracking-widest text-on-surface-variant uppercase gap-2 items-center">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link to="/events" className="hover:text-primary transition-colors">
              Events
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-primary-container">{event.title}</span>
          </nav>
          <h1 className="font-headline text-4xl md:text-7xl font-black text-on-surface leading-none tracking-tight drop-shadow-[0_0_12px_rgba(255,107,53,0.35)]">
            {event.title}
          </h1>
          {event.tagline ? (
            <p className="mt-3 font-headline text-lg text-secondary-container tracking-wider uppercase opacity-90">
              {event.tagline}
            </p>
          ) : null}
        </div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-10 gap-12">
        <div className="lg:col-span-7 space-y-14">
          <section>
            <SectionHeader title="Protocol overview" accent="primary-container" />
            <div className="space-y-4 text-on-surface/85 leading-relaxed text-lg">
              {event.description.split('\n').map((para, i) => {
                // simple keyword highlighter
                const highlighted = para
                  .replace(/(Neural Nexus 2026)/g, '<span class="text-primary-container font-bold">$1</span>')
                  .replace(/(48-hour)/g, '<span class="text-secondary-container font-bold">$1</span>')
                  .replace(/(IEEE Quantum Core)/g, '<span class="text-primary-container font-bold">$1</span>')
                  .replace(/(Neural-Link)/g, '<span class="text-secondary-container font-bold">$1</span>')

                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />
                )
              })}
            </div>
          </section>

          <section className="bg-surface-container-low/80 backdrop-blur-sm p-6 md:p-8 border-l-2 border-primary-container relative overflow-hidden rounded-sm">
            <h3 className="font-headline text-xl font-bold mb-6 tracking-widest uppercase text-on-surface">
              Execution rules
            </h3>
            <RulesWin95Panel rules={event.rules} eventSlug={event.slug} />
          </section>

          {event.faqs.length > 0 ? (
            <section>
              <SectionHeader title="FAQ_terminal" accent="secondary-container" />
              <div className="space-y-2">
                {event.faqs.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-surface-container-lowest/90 backdrop-blur-sm border border-on-surface/10 rounded-sm"
                  >
                    <summary className="flex justify-between items-center p-5 cursor-pointer list-none font-headline">
                      <span>{f.question}</span>
                      <span className="text-secondary-container group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-on-surface/65 border-t border-on-surface/10 pt-3 text-sm">
                      {f.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h3 className="font-headline text-sm font-bold mb-4 tracking-widest uppercase text-on-surface-variant">
              Coordinators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.coordinators.map((c) => (
                <div
                  key={c.name}
                  className="bg-surface-container/90 backdrop-blur-sm flex items-center gap-4 p-4 border border-outline-variant/15 rounded-sm"
                >
                  <div className="w-12 h-12 bg-primary-container/20 flex items-center justify-center rounded-sm text-primary-container font-headline font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">{c.name}</p>
                    <p className="text-xs text-secondary-container font-mono">{c.contactNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-3">
          <EventPdaSidebar event={event} canRegister={canRegister} />
          <p className="text-center text-[10px] font-mono text-on-surface/35 uppercase tracking-tighter mt-3">
            // secure_channel //
          </p>
        </aside>
      </main>
    </div>
  )
}
