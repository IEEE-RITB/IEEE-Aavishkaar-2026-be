import { Link } from 'react-router-dom'

const sphereImg =
  'https://images.unsplash.com/photo-1614854262312-ef9309dc2fc7?w=400&q=80'

export function OrbitingHero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-4">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,120vw)] h-[min(800px,120vw)] pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbit-circle w-full h-full border-dashed opacity-20 hero-orbit-slow" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbit-circle w-[70%] h-[70%] opacity-10 rotate-45 hero-orbit-mid" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="orbit-circle w-[120%] h-[120%] opacity-[0.05] -rotate-12 hero-orbit-fast" />
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl">
        <div className="relative w-56 h-56 md:w-72 md:h-72 mb-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-[60px]" aria-hidden />
          <img
            src={sphereImg}
            alt=""
            className="w-44 h-44 md:w-52 md:h-52 object-cover rounded-full z-30 ring-2 ring-primary-container/40 drop-shadow-[0_0_30px_#ff6b35]"
          />
          <div className="absolute -top-2 -right-10 font-headline text-[10px] tracking-[0.2em] text-secondary opacity-40 text-left">
            LAT: 34.0522° N
            <br />
            LNG: 118.2437° W
          </div>
          <div className="absolute -bottom-6 -left-10 font-headline text-[10px] tracking-[0.2em] text-tertiary opacity-40 text-left">
            SYS_AUTH: ENABLED
            <br />
            VER: 2026.SINGULARITY
          </div>
        </div>

        <p className="font-retro text-primary-container/85 tracking-[0.25em] text-[10px] md:text-xs uppercase mb-4 drop-shadow-[0_0_12px_rgba(255,107,53,0.35)]">
          IEEE presents the premier tech symposium
        </p>
        <h1 className="font-retro text-retro-orange font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-wide uppercase">
          Journey through the timeline
        </h1>
        <p className="mt-6 text-on-surface-variant/85 max-w-2xl mx-auto font-light leading-relaxed text-base md:text-lg">
          Explore the past, present, and future of engineering. A multi-day deep dive into
          the technologies shaping human evolution.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center mt-10">
          <a
            href="#featured-protocols"
            className="inline-flex items-center justify-center px-10 py-4 rounded-sm bg-primary-container text-on-primary-container font-retro font-bold tracking-widest uppercase text-sm transition-all duration-150 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-container"
          >
            Enter now
          </a>
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-8 py-4 rounded-sm border border-secondary-container/40 backdrop-blur-md text-secondary-container font-retro font-bold tracking-widest uppercase text-sm hover:bg-secondary-container/10 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-container"
          >
            Full catalog
          </Link>
        </div>
      </div>

      <div className="mt-20 w-full max-w-5xl z-20 grid grid-cols-1 md:grid-cols-3 gap-1 px-2">
        {[
          { n: '50+', l: 'Immersive events', c: 'secondary-container' },
          { n: '100+', l: 'Engagement hours', c: 'primary-container' },
          { n: '1000+', l: 'Global participants', c: 'tertiary-container' },
        ].map((s) => (
          <div
            key={s.l}
            className="bg-surface-container-high/40 backdrop-blur-xl p-8 border border-outline-variant/10 group hover:border-secondary-container/30 transition-all"
          >
            <div
              className={`text-4xl font-black mb-1 ${
                s.c === 'primary-container' ? 'font-retro text-retro-orange' : 'font-headline'
              }`}
              style={{
                color:
                  s.c === 'secondary-container'
                    ? 'var(--color-secondary-container)'
                    : s.c === 'primary-container'
                      ? undefined
                      : 'var(--color-tertiary-container)',
              }}
            >
              {s.n}
            </div>
            <div className="font-headline text-xs tracking-[0.2em] uppercase text-on-surface-variant opacity-60">
              {s.l}
            </div>
            <div
              className="mt-4 h-1 w-12 group-hover:w-full transition-all duration-500 opacity-40"
              style={{
                backgroundColor:
                  s.c === 'secondary-container'
                    ? 'var(--color-secondary-container)'
                    : s.c === 'primary-container'
                      ? 'var(--color-primary-container)'
                      : 'var(--color-tertiary-container)',
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-3xl flex items-center gap-4 opacity-25 px-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-outline" />
        <span className="text-xs font-mono">◆</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-outline" />
      </div>
    </section>
  )
}
