/** View model aligned with IEEE-Aavishkaar-2026-be event.schema.ts */

export type RegistrationStatus = 'OPEN' | 'CLOSED' | 'FULL'

export interface PrizeTier {
  position: number
  amount: number
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Coordinator {
  name: string
  contactNumber: string
}

export interface RegistrationFees {
  standard: number
  ieeeMember: number
}

export interface TechfestEvent {
  _id?: string
  organizerId: string
  title: string
  slug: string
  tagline?: string
  description: string
  posterURL?: string
  dateTime: string
  venue: string | null
  prizePool: PrizeTier[]
  minTeamSize: number
  maxTeamSize: number
  maxCapacity: number
  registrationCount?: number
  registrationStatus: RegistrationStatus
  isVisible: boolean
  registrationFees?: RegistrationFees | null
  rules: string[]
  faqs: FaqItem[]
  coordinators: Coordinator[]
}
