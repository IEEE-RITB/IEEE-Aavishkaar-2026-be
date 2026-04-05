import type { TechfestEvent } from '../types/event'

const poster =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'

export const mockEvents: TechfestEvent[] = [
  {
    organizerId: 'org-1',
    title: 'Neural Nexus Hackathon',
    slug: 'neural-nexus-hackathon',
    tagline: '// Decoding the future of quantum cognition',
    description:
      'Welcome to Neural Nexus 2026, the premier competitive arena for neural engineers and quantum programmers. In this 48-hour high-intensity sprint, participants will be tasked with bridging the gap between biological synapses and synthetic processors.\nThe mission is simple: Develop an interface that allows for near-zero latency data transfer between a standard Neural-Link interface and our proprietary IEEE Quantum Core. Only the most efficient algorithms will survive the scrutiny of our automated validation systems.',
    posterURL: poster,
    dateTime: new Date('2026-03-14T08:00:00Z').toISOString(),
    venue: 'Cyber-Core Lab 4',
    prizePool: [
      { position: 1, amount: 50000 },
      { position: 2, amount: 25000 },
      { position: 3, amount: 10000 },
    ],
    minTeamSize: 2,
    maxTeamSize: 4,
    maxCapacity: 50,
    registrationCount: 41,
    registrationStatus: 'OPEN',
    isVisible: true,
    registrationFees: { standard: 0, ieeeMember: 0 },
    rules: [
      'Participants must use the provided SDK only. External binary injections are strictly monitored.',
      'Maximum power consumption for the solution must not exceed 450 Watts of simulated energy.',
      'Real-time telemetry data must be streamed to the judges\' dashboard throughout the event.',
      'Any use of pre-computed large language models is restricted to the "Augmentation" category only.',
    ],
    faqs: [
      {
        question: 'Is prior hardware knowledge required?',
        answer:
          'Not mandatory; low-level kernel and FPGA experience helps during hardware integration.',
      },
      {
        question: 'What is the prize pool distribution?',
        answer:
          'Top three teams receive tiered IEEE 2026 Endowment units plus partner recruitment priority.',
      },
    ],
    coordinators: [
      { name: 'Alex Rivera', contactNumber: '+1 (555) 010-0420' },
      { name: 'Chen Wei', contactNumber: 'core_op@techfest.com' },
    ],
  },
  {
    organizerId: 'org-1',
    title: 'Retrogrid Robotics Cup',
    slug: 'retrogrid-robotics',
    tagline: '// Autonomous grids, analog dreams',
    description:
      'Line-following and obstacle arenas with a synthwave twist. Bring your microcontrollers and nerve.',
    posterURL:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    dateTime: new Date('2026-03-15T10:00:00Z').toISOString(),
    venue: 'Hall B — Mechatronics Bay',
    prizePool: [{ position: 1, amount: 15000 }],
    minTeamSize: 1,
    maxTeamSize: 3,
    maxCapacity: 30,
    registrationCount: 30,
    registrationStatus: 'FULL',
    isVisible: true,
    rules: ['No external teleoperation during timed runs.'],
    faqs: [
      {
        question: 'Kit provided?',
        answer: 'Base chassis optional; controllers are BYO.',
      },
    ],
    coordinators: [{ name: 'Sam Okonkwo', contactNumber: '+1 (555) 010-7700' }],
  },
  {
    organizerId: 'org-1',
    title: 'Photon Circuit Sprint',
    slug: 'photon-circuit-sprint',
    tagline: '// Fast boards, faster timelines',
    description:
      'Design sprint for optical interconnect demos. PCB bring-up in record time.',
    posterURL:
      'https://images.unsplash.com/photo-1558346547-4439467d4ad7?w=600&q=80',
    dateTime: new Date('2026-03-16T09:30:00Z').toISOString(),
    venue: 'Lab 7 — Photonics',
    prizePool: [
      { position: 1, amount: 20000 },
      { position: 2, amount: 8000 },
    ],
    minTeamSize: 1,
    maxTeamSize: 2,
    maxCapacity: 40,
    registrationCount: 12,
    registrationStatus: 'OPEN',
    isVisible: true,
    rules: ['All designs must pass safety review before power-on.'],
    faqs: [],
    coordinators: [{ name: 'Jordan Lee', contactNumber: 'photon@techfest.com' }],
  },
]

export function getEventBySlug(slug: string): TechfestEvent | undefined {
  return mockEvents.find((e) => e.slug === slug)
}

export function capacityPercent(e: TechfestEvent): number {
  const n = e.registrationCount ?? 0
  if (e.maxCapacity <= 0) return 0
  return Math.min(100, Math.round((n / e.maxCapacity) * 100))
}
