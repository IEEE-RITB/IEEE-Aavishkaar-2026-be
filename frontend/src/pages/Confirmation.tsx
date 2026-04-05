import { Link, useLocation, useParams } from 'react-router-dom'
import { RegistrationReceipt } from '../components/RegistrationReceipt'
import { PdaStatus } from '../components/PdaStatus'

type LocState = {
  referenceId?: string
  eventTitle?: string
  email?: string
}

export function Confirmation() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const s = (location.state ?? {}) as LocState

  const referenceId = s.referenceId ?? 'TF-PENDING-000000'
  const eventTitle = s.eventTitle ?? 'Event'
  const email = s.email ?? '—'

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-10">
      <h1 className="font-display text-3xl md:text-4xl font-black text-on-surface">
        Registration <span className="text-primary-container">complete</span>
      </h1>
      <p className="text-on-surface-variant text-sm max-w-md mx-auto">
        Your ticket has been committed to the timeline. Save your reference ID.
      </p>

      <RegistrationReceipt
        eventTitle={eventTitle}
        referenceId={referenceId}
        participantEmail={email}
      />

      <div className="pt-4">
        <PdaStatus referenceId={referenceId} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Link
          to={slug ? `/events/${slug}` : '/events'}
          className="font-headline text-sm uppercase tracking-widest text-secondary-container hover:text-primary-container"
        >
          Event page
        </Link>
        <Link
          to="/events"
          className="font-headline text-sm uppercase tracking-widest text-secondary-container hover:text-primary-container"
        >
          Catalog
        </Link>
      </div>
    </div>
  )
}
