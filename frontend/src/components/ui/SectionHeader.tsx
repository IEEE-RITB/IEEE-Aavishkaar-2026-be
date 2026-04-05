export function SectionHeader({
  eyebrow,
  title,
  accent = 'primary-container',
}: {
  eyebrow?: string
  title: string
  accent?: 'primary-container' | 'secondary-container' | 'tertiary-container'
}) {
  const line =
    accent === 'primary-container'
      ? 'bg-primary-container'
      : accent === 'secondary-container'
        ? 'bg-secondary-container'
        : 'bg-tertiary-container'
  const text =
    accent === 'primary-container'
      ? 'text-primary-container'
      : accent === 'secondary-container'
        ? 'text-secondary-container'
        : 'text-tertiary-container'

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`h-px w-12 shrink-0 ${line}`} />
      <div>
        {eyebrow ? (
          <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/70 mb-1">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={`font-headline text-2xl font-bold tracking-widest uppercase ${text}`}
        >
          {title}
        </h2>
      </div>
    </div>
  )
}
