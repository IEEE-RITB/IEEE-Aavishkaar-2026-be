/** PDA-style briefing card — condensed from web_design_promt PDA (chase2k25) */
export function LandingPdaBriefing() {
  return (
    <div
      className="w-full max-w-[300px] mx-auto md:mx-0 rounded-2xl p-3 text-left relative"
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
          background: '#2a1010',
          boxShadow: 'inset 0 0 2px #ff5b5b, 0 0 8px rgba(255,60,60,0.35)',
        }}
      />
      <div
        className="mt-7 rounded-lg overflow-hidden relative"
        style={{
          background: 'linear-gradient(180deg, #f0e2b8, #e8d5a8)',
          boxShadow:
            'inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.1), 0 0 0 2px #101010',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent 0 1px, rgba(0,0,0,0.07) 1px 2px)',
          }}
        />
        <div className="relative px-3 py-3 text-[11px] font-bold text-[#3a2700] space-y-2">
          <div className="flex justify-between border-b border-black/10 pb-1">
            <span className="uppercase tracking-wider">Briefing</span>
            <span className="text-[#6b5228]">LIVE</span>
          </div>
          <p className="uppercase text-[10px] tracking-[0.2em] text-[#6b5228]">
            Next window
          </p>
          <p>Retrogrid + Neural tracks online.</p>
          <div
            className="h-1.5 border border-[#3a2700] relative overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#3a2700] opacity-90"
              style={{ width: '72%' }}
            />
          </div>
          <p className="text-[10px] text-[#6b5228] text-center">▼ sync to featured boxes</p>
        </div>
      </div>
    </div>
  )
}
