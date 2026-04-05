/** Subtle brick interaction — nod to web_design_promt Mario-style snippet */
export function RetroEasterEgg() {
  return (
    <div
      className="retro-easter-wrap fixed bottom-5 right-5 z-[40] hidden sm:block"
      title="Classified"
    >
      <div className="relative">
        <div className="retro-easter-hit" aria-hidden />
        <div className="retro-easter-mush" aria-hidden />
      </div>
    </div>
  )
}
