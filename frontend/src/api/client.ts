import type { TechfestEvent } from '../types/event'
import { getEventBySlug, mockEvents } from '../mocks/events'

const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? ''

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

/** List visible events — uses API when VITE_API_BASE_URL is set, else mocks. */
export async function fetchEvents(): Promise<TechfestEvent[]> {
  if (!base) {
    await delay(200)
    return mockEvents.filter((e) => e.isVisible)
  }
  const res = await fetch(`${base}/api/events`)
  if (!res.ok) throw new Error('Failed to load events')
  return res.json() as Promise<TechfestEvent[]>
}

export async function fetchEventBySlug(slug: string): Promise<TechfestEvent | null> {
  if (!base) {
    await delay(150)
    const e = getEventBySlug(slug)
    return e && e.isVisible ? e : null
  }
  const res = await fetch(`${base}/api/events/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to load event')
  return res.json() as Promise<TechfestEvent>
}

export interface RegistrationPayload {
  eventSlug: string
  teamName: string
  leadEmail: string
  leadPhone: string
  memberNames: string[]
}

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<{ ok: true; referenceId: string }> {
  if (!base) {
    await delay(400)
    const ref = `TF-${payload.eventSlug.slice(0, 4).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    return { ok: true, referenceId: ref }
  }
  const res = await fetch(`${base}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Registration failed')
  const data = (await res.json()) as { referenceId: string }
  return { ok: true, referenceId: data.referenceId }
}
