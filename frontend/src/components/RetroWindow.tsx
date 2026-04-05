import type { ReactNode } from 'react'

/** Win95-inspired panel recolored for Techfest tokens */
export function RetroWindow({
  title = 'PROTOCOL.TXT',
  tabs,
  activeTab,
  onTabChange,
  children,
  footer,
}: {
  title?: string
  tabs?: string[]
  activeTab?: string
  onTabChange?: (t: string) => void
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div
      className="w-full max-w-xl mx-auto text-left text-[11px]"
      style={{
        fontFamily: '"Segoe UI", Tahoma, sans-serif',
      }}
    >
      <div
        className="rounded-sm p-0.5"
        style={{
          background: 'var(--color-surface-container)',
          border: '2px solid',
          borderColor: 'rgba(222,224,255,0.25)',
          boxShadow: '2px 2px 0 rgba(0,0,0,0.35)',
        }}
      >
        <div
          className="flex flex-col overflow-hidden rounded-sm"
          style={{
            background: 'var(--color-surface-container-high)',
            border: '2px inset',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="flex items-center justify-between px-1 py-0.5 shrink-0"
            style={{
              background: 'linear-gradient(90deg, #1a1e37, #2f334e)',
              borderBottom: '1px solid rgba(0,0,0,0.5)',
            }}
          >
            <span className="text-on-surface text-xs font-bold pl-1 tracking-wide truncate">
              {title}
            </span>
            <div className="flex gap-0.5 pr-0.5">
              <span
                className="w-4 h-3.5 text-[10px] leading-none flex items-center justify-center"
                style={{
                  background: 'var(--color-surface-container)',
                  border: '2px outset rgba(222,224,255,0.2)',
                }}
              >
                _
              </span>
              <span
                className="w-4 h-3.5 text-[10px] leading-none flex items-center justify-center"
                style={{
                  background: 'var(--color-surface-container)',
                  border: '2px outset rgba(222,224,255,0.2)',
                }}
              >
                □
              </span>
            </div>
          </div>

          {tabs && tabs.length > 0 ? (
            <div
              className="flex gap-0 px-0.5 pt-0.5 shrink-0"
              style={{
                background: 'var(--color-surface-container)',
                borderBottom: '1px solid rgba(0,210,253,0.15)',
              }}
              role="tablist"
            >
              {tabs.map((t) => {
                const active = t === activeTab
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onTabChange?.(t)}
                    className="px-2 py-0.5 text-[11px] uppercase tracking-wide cursor-pointer text-on-surface"
                    style={{
                      background: active
                        ? 'var(--color-surface-container-high)'
                        : 'var(--color-surface-container)',
                      border: '2px outset rgba(222,224,255,0.15)',
                      borderBottom: active ? 'none' : undefined,
                      marginBottom: active ? -1 : 0,
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          ) : null}

          <div
            className="flex flex-1 min-h-[120px] m-1 p-1 overflow-auto text-on-surface"
            style={{
              background: '#0d112a',
              border: '1px inset rgba(0,210,253,0.2)',
              fontFamily: '"Space Mono", monospace',
              fontSize: 12,
              lineHeight: 1.35,
            }}
          >
            {children}
          </div>

          {footer ? (
            <div
              className="flex justify-between items-center px-1 py-0.5 shrink-0 text-on-surface text-[11px]"
              style={{
                background: 'var(--color-surface-container)',
                borderTop: '1px solid rgba(0,210,253,0.12)',
              }}
            >
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
