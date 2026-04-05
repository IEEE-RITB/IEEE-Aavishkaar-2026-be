/** Win9x-style code viewer — styling from web_design_promt (Uiverse pharmacist-sabot), Techfest palette */
export function RetroCodePanel() {
  const lines = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className="retro-code-outer" aria-label="Boot manifest">
      <div className="retro-code-inner">
        <div className="retro-code-titlebar">TECHFEST_SYS — MANIFEST.TS</div>
        <div className="retro-code-body">
          <div className="retro-code-ln" aria-hidden>
            {lines.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <pre className="m-0 pl-2 pr-1 whitespace-pre-wrap flex-1 text-left">
            <span className="retro-code-cmt">// Analog Singularity kernel</span>
            {'\n'}
            <span className="retro-code-kw">import</span> {'{ '}
            <span className="retro-code-fn">igniteTimeline</span>
            {' } '}
            <span className="retro-code-kw">from</span>{' '}
            <span className="retro-code-str">&apos;@ieee/techfest-2026&apos;</span>
            {'\n\n'}
            <span className="retro-code-kw">const</span> manifest = {'{'}
            {'\n'}
            {'  '}theme:{' '}
            <span className="retro-code-str">&apos;retrofuturism&apos;</span>,{'\n'}
            {'  '}primary:{' '}
            <span className="retro-code-str">&apos;#ff6b35&apos;</span>,{'\n'}
            {'  '}status:{' '}
            <span className="retro-code-str">&apos;ALL_SYSTEMS_GO&apos;</span>
            {'\n'}
            {'}'}
            {'\n\n'}
            <span className="retro-code-fn">igniteTimeline</span>(manifest)
          </pre>
        </div>
        <div className="retro-code-footer">
          <span>TypeScript</span>
          <span className="retro-code-btn" role="presentation">
            OK
          </span>
        </div>
      </div>
    </div>
  )
}
