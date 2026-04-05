/** Compact retro PDA readout for confirmation flair */

export function PdaStatus({ referenceId }: { referenceId: string }) {
  return (
    <div
      className="mx-auto w-[280px] max-w-full rounded-2xl p-3 relative text-left"
      style={{
        fontFamily: '"Space Mono", monospace',
        background: 'linear-gradient(180deg, #5c6169, #2b2f35)',
        boxShadow:
          'inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -2px 0 rgba(0,0,0,0.35), 0 12px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{
          background: '#3a1010',
          boxShadow: 'inset 0 0 2px #ff5b5b, 0 0 0 1px #100',
        }}
      />
      <div
        className="mt-6 rounded-lg overflow-hidden relative"
        style={{
          background: '#e8d5a8',
          boxShadow:
            'inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.1), 0 0 0 2px #101010',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent 0 1px, rgba(0,0,0,0.06) 1px 2px)',
          }}
        />
        <div className="relative px-3 py-3 text-[11px] font-bold text-[#3a2700] space-y-2">
          <div className="flex justify-between border-b border-black/10 pb-1">
            <span>PDA-LINK</span>
            <span className="opacity-70">OK</span>
          </div>
          <p className="uppercase tracking-wider text-[10px] text-[#6b5228]">
            Ticket checksum
          </p>
          <p className="break-all">{referenceId}</p>
          <div
            className="h-2 border border-[#3a2700] relative overflow-hidden mt-2"
            style={{ background: 'rgba(0,0,0,0.05)' }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#3a2700] animate-pulse"
              style={{ width: '88%' }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <div
          className="w-6 h-6 rounded-full grid place-items-center"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #7b828a, #444a52)',
            boxShadow:
              'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.45)',
          }}
        >
          <span className="w-2 h-2 rounded-sm bg-[#14181d]" />
        </div>
      </div>
    </div>
  )
}
