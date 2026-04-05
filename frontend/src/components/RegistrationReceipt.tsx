import { useEffect, useState } from 'react'

export function RegistrationReceipt({
  eventTitle,
  referenceId,
  participantEmail,
}: {
  eventTitle: string
  referenceId: string
  participantEmail: string
}) {
  const [phase, setPhase] = useState<'printing' | 'done'>('printing')

  useEffect(() => {
    const t = window.setTimeout(() => setPhase('done'), 900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div
      className="relative mx-auto w-full max-w-[340px] select-none"
      style={{ fontSize: 14 }}
      aria-live="polite"
    >
      <div
        className="relative rounded-b-lg mx-auto"
        style={{
          width: 320,
          maxWidth: '100%',
          height: 80,
          backgroundColor: '#2a2838',
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.06), transparent)',
          border: '2px solid #3d3a4f',
          boxShadow: '0 16px 32px 0 rgba(0,0,0,0.15), 0 -24px 16px 0 rgba(0,0,0,0.08)',
        }}
      >
        <div
          className="absolute -top-8 left-0 w-full h-[70px] rounded-t-xl pointer-events-none"
          style={{
            borderBottom: '2px solid rgba(0,0,0,0.2)',
            boxShadow:
              'inset 0 12px 16px -12px rgba(255,255,255,0.08), inset 0 -6px 16px -6px rgba(0,0,0,0.25)',
            background: 'linear-gradient(180deg, #3a3848, #2a2838)',
          }}
        />
        <div
          className="absolute top-2 left-8 z-[2] flex items-center px-2 py-1.5 font-mono text-[11px] rounded-md"
          style={{
            width: 160,
            height: 32,
            background: '#000',
            color: '#5aff5a',
            border: '3px solid #4a4658',
            boxShadow:
              'inset -1px -1px 2px 0 rgba(0,0,0,0.5), inset 1px 1px 2px 0 rgba(255,255,255,0.06)',
          }}
        >
          {phase === 'printing' ? 'PRINTING…' : 'READY'}
        </div>
      </div>

      <div
        className="relative left-1/2 -translate-x-1/2 -mt-2"
        style={{
          filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.15))',
          clipPath:
            phase === 'done'
              ? 'inset(-20% -100px -100px -100px)'
              : 'inset(100% -100px -100px -100px)',
          transition: 'clip-path 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          className="relative flex flex-col gap-3 p-4 w-[220px] max-w-[90vw] text-sm font-mono text-zinc-700"
          style={{
            background: '#f0eee6',
            boxShadow: '0 12px 12px 0 rgba(0,0,0,0.08)',
          }}
        >
          <div
            className="absolute left-0 w-full h-2 -top-2 opacity-90"
            style={{
              background: `repeating-linear-gradient(-45deg, #f0eee6 0 4px, transparent 4px 8px)`,
            }}
          />
          <div className="flex justify-between items-center border-b border-dashed border-zinc-300 pb-2">
            <span className="font-bold text-zinc-900">IEEE TECHFEST</span>
            <span className="text-xs text-zinc-500">2026</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">Registration</p>
          <p className="font-bold text-zinc-900 leading-tight">{eventTitle}</p>
          <div className="text-xs space-y-1 border-t border-dashed border-zinc-300 pt-2">
            <div className="flex justify-between gap-2">
              <span className="text-zinc-500">Ref</span>
              <span className="font-mono font-bold">{referenceId}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-zinc-500">Email</span>
              <span className="truncate max-w-[120px]">{participantEmail}</span>
            </div>
          </div>
          <p className="text-center text-xs text-zinc-500 pt-1">
            // secure_channel_ack //
          </p>
        </div>
      </div>
    </div>
  )
}
