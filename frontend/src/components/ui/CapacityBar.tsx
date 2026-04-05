export function CapacityBar({
  percent,
  label = 'Bandwidth / Capacity',
}: {
  percent: number
  label?: string
}) {
  const p = Math.min(100, Math.max(0, percent))
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <p className="text-[10px] font-label tracking-[0.2em] text-on-surface-variant uppercase">
          {label}
        </p>
        <p className="text-xs font-mono text-secondary">{p}%</p>
      </div>
      <div className="h-2 w-full bg-background border border-secondary-container/20 rounded-sm overflow-hidden">
        <div
          className="h-full bg-secondary-container shadow-[0_0_10px_rgba(0,210,253,0.5)] transition-all duration-1000"
          style={{ width: `${p}%` }}
        />
      </div>
    </div>
  )
}
