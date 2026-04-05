import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<
  Variant,
  string
> = {
  primary:
    'bg-primary-container text-on-primary-container font-headline font-bold tracking-widest uppercase transition-all duration-150 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] active:scale-95',
  secondary:
    'border-2 border-secondary-container text-on-surface bg-transparent font-headline font-bold tracking-widest uppercase transition-all duration-150 hover:bg-secondary-container/10 hover:shadow-[0_0_20px_rgba(0,210,253,0.25)] active:scale-95',
  ghost:
    'border border-outline-variant/50 backdrop-blur-md text-on-surface font-headline font-bold tracking-widest uppercase hover:bg-white/5 transition-all',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={`relative px-8 py-4 rounded-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
