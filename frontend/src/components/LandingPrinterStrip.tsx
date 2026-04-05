/** Static “receipt printer” strip — inspired by web_design_promt printer / dexter-st */
export function LandingPrinterStrip() {
  return (
    <div
      className="w-full max-w-md mx-auto select-none"
      aria-hidden
      style={{ fontSize: 13 }}
    >
      <div
        className="relative rounded-b-lg mx-auto"
        style={{
          height: 56,
          maxWidth: '100%',
          width: 280,
          backgroundColor: '#dcd8c8',
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 2px, rgba(0,0,0,0.04) 2px 4px)',
          border: '2px solid #b8b4a8',
          boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
        }}
      >
        <div
          className="absolute -top-5 left-0 w-full h-12 rounded-t-lg pointer-events-none"
          style={{
            borderBottom: '2px solid rgba(0,0,0,0.15)',
            background: 'linear-gradient(180deg, #ece8dc, #d4d0c4)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        />
        <div
          className="absolute top-2 left-6 z-[1] flex items-center px-2 py-1 font-mono text-[10px] rounded"
          style={{
            width: 120,
            height: 26,
            background: '#000',
            color: '#5aff5a',
            border: '2px solid #9a9688',
          }}
        >
          ADMIT_01
        </div>
      </div>
      <div
        className="relative -mt-1 mx-auto px-3 py-2 w-[200px] max-w-[85%] font-mono text-[11px] text-zinc-700"
        style={{
          background: '#f2efe6',
          boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
          clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
        }}
      >
        <p className="uppercase tracking-widest text-[9px] text-zinc-500 mb-1">Ticket</p>
        <p className="font-bold text-zinc-900">IEEE TECHFEST 2026</p>
        <p className="text-zinc-500 mt-1">// landing_clearance_granted</p>
      </div>
    </div>
  )
}
