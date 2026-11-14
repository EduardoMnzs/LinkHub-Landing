import { ArrowRight, CalendarBlank, Moon, Plus, Sun } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { APP_URL, RAIL_ADS, REPO_URL, type RailAd } from './content'
import { Board } from './sections/Board'
import { Closing } from './sections/Closing'
import { Ecosystem } from './sections/Ecosystem'
import { Info } from './sections/Info'
import { Screens } from './sections/Screens'
import { EASE, Logo } from './ui'

const NAV = [
  { href: '#ecossistema', label: 'Como funciona' },
  { href: '#telas', label: 'Telas' },
  { href: '#ideias', label: 'Ideias' },
  { href: '#desafio', label: 'Desafio' },
]

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const t = localStorage.getItem('theme')
      if (t === 'light' || t === 'dark') return t
    } catch {
      /* ignore */
    }
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'dark' ? '#171614' : '#f6f2eb')
  }, [theme])
  const toggle = () =>
    setTheme((t) => {
      const n = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', n)
      } catch {
        /* ignore */
      }
      return n
    })
  return [theme, toggle] as const
}

/** Barra flutuante que aparece depois do topo. */
function FloatingNav({ theme, onTheme }: { theme: string; onTheme: () => void }) {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 420))
  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="seções"
          initial={{ opacity: 0, y: -16, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -16, x: '-50%' }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed top-3 left-1/2 z-50 flex max-w-[calc(100vw-24px)] items-center gap-1 rounded-full border border-line bg-card/85 p-1.5 shadow-menu backdrop-blur-md"
        >
          <a href="#topo" className="press grid h-8 place-items-center rounded-full px-2 hover:bg-well" aria-label="Topo">
            <Logo size={22} word={false} />
          </a>
          <div className="no-scrollbar flex min-w-0 items-center overflow-x-auto">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="press rounded-full px-3 py-1.5 text-[12.5px] whitespace-nowrap text-mute hover:bg-well hover:text-text">
                {n.label}
              </a>
            ))}
          </div>
          <button type="button" onClick={onTheme} aria-label="trocar tema" className="press grid size-8 shrink-0 place-items-center rounded-full text-mute hover:bg-well hover:text-text">
            {theme === 'dark' ? <Moon weight="duotone" className="size-4" /> : <Sun weight="duotone" className="size-4" />}
          </button>
          <a
            href={APP_URL}
            className="press hidden h-8 shrink-0 items-center gap-1.5 rounded-full bg-accent px-3.5 text-[12.5px] font-semibold text-on-accent hover:bg-accent-hover sm:inline-flex"
          >
            Ver protótipo
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

/** Mini card de marca: capa na cor do anunciante + monograma, sem emojis. */
function RailAdCard({ ad, i }: { ad: RailAd; i: number }) {
  return (
    <motion.a
      href="#ideias"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.3 + 0.08 * i }}
      className="group block overflow-hidden rounded-[16px] bg-card text-left shadow-card transition-shadow hover:shadow-lift"
    >
      <span className="relative block h-12 overflow-hidden" style={{ background: ad.color }}>
        <span
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{ background: 'radial-gradient(120% 140% at 100% 0%, rgb(255 255 255 / 0.28), transparent 55%)' }}
        />
        <span aria-hidden className="absolute -right-3 -bottom-5 size-16 rounded-full border border-white/20" />
        <span aria-hidden className="absolute right-4 -bottom-8 size-16 rounded-full border border-white/15" />
      </span>
      <span className="relative -mt-5 grid gap-1.5 px-3 pb-3">
        <span
          className="grid size-10 place-items-center rounded-[11px] text-[13px] font-semibold tracking-[-0.02em] text-white ring-[3px] ring-card"
          style={{ background: ad.color }}
        >
          {ad.initials}
        </span>
        <span className="grid gap-0.5">
          <strong className="text-[12px] leading-[1.35] font-semibold">{ad.name}</strong>
          <span className="font-mono text-[8.5px] tracking-[0.06em] text-faint uppercase">{ad.kind}</span>
        </span>
        <span className="text-[10.5px] leading-[1.5] text-mute">{ad.desc}</span>
        <span className="mt-1 flex items-center border-t border-line pt-2">
          <span className="flex items-center gap-0.5 text-[10.5px] font-semibold text-accent-ink">
            {ad.cta}
            <ArrowRight className="size-2.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </motion.a>
  )
}

/** Coluna lateral de "PUBLICIDADE": demonstra os espaços patrocinados da própria rede. */
function AdRail({ side }: { side: 'left' | 'right' }) {
  const ads = RAIL_ADS[side]
  return (
    <aside aria-label={`Espaços de publicidade à ${side === 'left' ? 'esquerda' : 'direita'}`} className="sticky top-6 hidden self-start pt-6 xl:grid xl:gap-3">
      <span className="text-center font-mono text-[8px] tracking-[0.14em] text-faint">PUBLICIDADE</span>
      {ads.map((ad, i) => (
        <RailAdCard key={ad.name} ad={ad} i={i} />
      ))}
      {side === 'right' && (
        <motion.a
          href="#ideias"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 + 0.08 * ads.length }}
          className="group grid gap-1.5 rounded-[16px] border border-dashed border-line-strong p-3 text-left transition-colors hover:border-accent hover:bg-accent-soft/40"
        >
          <span className="grid size-8 place-items-center rounded-[10px] border border-dashed border-line-strong text-faint transition-colors group-hover:border-accent group-hover:text-accent-ink">
            <Plus weight="bold" className="size-3.5" />
          </span>
          <strong className="text-[12px] font-semibold">Anuncie aqui</strong>
          <span className="text-[10.5px] leading-[1.5] text-mute">Espaços revisados pela associação, a partir de R$ 150/mês.</span>
        </motion.a>
      )}
      <p className="px-1 text-center text-[10px] leading-[1.5] text-faint">Marcas que fazem parte da jornada do lojista.</p>
    </aside>
  )
}

function Hero() {
  return (
    <section id="topo" className="grid justify-items-center px-4 pt-14 pb-12 text-center sm:pt-[65px]">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong py-[3px] pr-3 pl-[5px] text-[11px] text-mute"
      >
        <img src="/images/dino-96.png" alt="" className="size-6 object-contain" />
        protótipo para o desafio <strong className="font-semibold text-text">FACESP</strong>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="mt-6 mb-[15px] text-[36px] leading-[1.08] font-[650] tracking-[-0.045em] sm:text-[48.96px]"
      >
        O lojista pede.
        <br className="sm:hidden" /> A startup resolve.
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        className="max-w-[540px] text-[15px] leading-[1.7] text-mute"
      >
        O LinkHub conecta pequenos varejistas, associações comerciais e startups: soluções compatíveis explicadas, teste grátis em um clique e
        demandas sem resposta que viram oportunidades de desenvolvimento conjunto.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="mt-[26px] flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
      >
        <a
          href={APP_URL}
          className="press inline-flex h-[42px] items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-on-accent hover:bg-accent-hover"
        >
          <Plus weight="bold" className="size-4" />
          Ver o protótipo
        </a>
        <a href="#ecossistema" className="group inline-flex items-center gap-1.5 text-[12px] text-mute hover:text-text">
          Como o ecossistema conversa
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-5 flex items-center gap-1.5 text-[11px] text-mute"
      >
        <CalendarBlank className="size-3.5" />
        Rodada de soluções · toda terça, 19h · na sua associação comercial
      </motion.p>
    </section>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  return (
    <div className="min-h-svh">
      <FloatingNav theme={theme} onTheme={toggleTheme} />
      <div className="mx-auto grid max-w-[1340px] gap-8 xl:grid-cols-[150px_minmax(0,960px)_150px] xl:justify-center">
        <AdRail side="left" />
        <main className="min-w-0 px-4 sm:px-6 xl:px-0">
          <Hero />
          <Board />
          <Ecosystem />
          <Screens />
          <Info />
          <Closing />
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-[11px] text-mute">
            <span>© 2026 LinkHub · protótipo para o desafio FACESP · dados fictícios</span>
            <span className="flex gap-4">
              <a href={REPO_URL} className="hover:text-text">Código</a>
              <a href={APP_URL} className="hover:text-text">Protótipo</a>
              <a href="#desafio" className="hover:text-text">O desafio</a>
            </span>
          </footer>
        </main>
        <AdRail side="right" />
      </div>
    </div>
  )
}
