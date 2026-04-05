import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchEventBySlug, submitRegistration } from '../api/client'
import { Button } from '../components/ui/Button'
import { RetroWindow } from '../components/RetroWindow'
import type { TechfestEvent } from '../types/event'

export function Register() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [payload, setPayload] = useState<{
    forSlug: string
    event: TechfestEvent | null
  } | null>(null)
  const [teamName, setTeamName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [members, setMembers] = useState<string[]>([''])
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

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
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-on-surface-variant mb-4">Invalid registration link.</p>
        <Link to="/events" className="text-primary-container">
          Catalog
        </Link>
      </div>
    )
  }

  const addMember = () => setMembers((m) => [...m, ''])
  const removeMember = (i: number) => setMembers((m) => m.filter((_, j) => j !== i))
  const setMember = (i: number, v: string) =>
    setMembers((m) => m.map((x, j) => (j === i ? v : x)))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!slug || !event) return
    if (!email.trim() || !teamName.trim()) {
      setError('Team name and lead email are required.')
      return
    }
    setBusy(true)
    try {
      const names = members.map((s) => s.trim()).filter(Boolean)
      const res = await submitRegistration({
        eventSlug: slug,
        teamName: teamName.trim(),
        leadEmail: email.trim(),
        leadPhone: phone.trim(),
        memberNames: names,
      })
      navigate(`/events/${slug}/confirmation`, {
        replace: true,
        state: {
          referenceId: res.referenceId,
          eventTitle: event.title,
          email: email.trim(),
        },
      })
    } catch {
      setError('Registration failed. Try again.')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 font-mono text-secondary-container">
        Loading form…
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-on-surface-variant mb-4">Event not found.</p>
        <Link to="/events" className="text-primary-container">
          Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <Link
        to={`/events/${event.slug}`}
        className="text-xs font-headline tracking-widest uppercase text-secondary-container hover:text-primary-container"
      >
        ← {event.title}
      </Link>
      <h1 className="font-display text-3xl md:text-4xl font-black mt-4 text-on-surface">
        Register
      </h1>
      <p className="text-on-surface-variant mt-2 text-sm">
        Team size: {event.minTeamSize}–{event.maxTeamSize} members.
      </p>

      <div className="mt-8 mb-8">
        <RetroWindow title="FORM.DAT" footer={<span>SYS: draft</span>}>
          <p className="text-secondary-container/90 mb-2">// input_manifest</p>
          <p className="opacity-80">
            Fields sync to the registration API when `VITE_API_BASE_URL` is configured.
          </p>
        </RetroWindow>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-[10px] font-headline tracking-[0.2em] uppercase text-primary-container mb-2">
            Team name
          </label>
          <input
            className="w-full bg-surface-container border border-outline-variant/30 rounded-sm px-4 py-3 text-on-surface font-headline focus:border-secondary-container focus:ring-1 focus:ring-secondary-container outline-none"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className="block text-[10px] font-headline tracking-[0.2em] uppercase text-primary-container mb-2">
            Lead email
          </label>
          <input
            type="email"
            className="w-full bg-surface-container border border-outline-variant/30 rounded-sm px-4 py-3 text-on-surface font-headline focus:border-secondary-container outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-[10px] font-headline tracking-[0.2em] uppercase text-on-surface-variant mb-2">
            Lead phone
          </label>
          <input
            type="tel"
            className="w-full bg-surface-container border border-outline-variant/30 rounded-sm px-4 py-3 text-on-surface font-headline focus:border-secondary-container outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-headline tracking-[0.2em] uppercase text-secondary-container">
            Additional members
          </p>
          {members.map((m, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="flex-1 bg-surface-container border border-outline-variant/30 rounded-sm px-3 py-2 text-on-surface font-mono text-sm outline-none focus:border-secondary-container"
                placeholder={`Member ${i + 1}`}
                value={m}
                onChange={(e) => setMember(i, e.target.value)}
              />
              {members.length > 1 ? (
                <button
                  type="button"
                  className="px-2 text-error text-sm font-mono hover:underline"
                  onClick={() => removeMember(i)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          {members.length < event.maxTeamSize ? (
            <button
              type="button"
              onClick={addMember}
              className="text-xs font-headline uppercase tracking-widest text-secondary-container border border-secondary-container/40 px-3 py-2 rounded-sm hover:bg-secondary-container/10"
            >
              + Add member
            </button>
          ) : null}
        </div>

        {error ? (
          <p className="text-error text-sm font-mono" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="primary" type="submit" disabled={busy} className="sm:flex-1">
            {busy ? 'Submitting…' : 'Submit registration'}
          </Button>
          <Link
            to={`/events/${event.slug}`}
            className="sm:flex-1 block text-center px-8 py-4 rounded-sm border border-outline-variant/50 backdrop-blur-md text-on-surface font-headline font-bold tracking-widest uppercase hover:bg-white/5 transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
