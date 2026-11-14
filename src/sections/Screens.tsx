import { ArrowsOut, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { SCREENS, type Shot } from '../content'
import { BrowserFrame, EASE, SectionHead } from '../ui'

type Tab = keyof typeof SCREENS

function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  useEffect(() => {
    if (!shot) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [shot, onClose])
  return (
    <AnimatePresence>
      {shot && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-[#151412]/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-label={shot.title}
        >
          <motion.img
            src={shot.src}
            alt={shot.title}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-[88vh] max-w-full rounded-[16px] shadow-menu"
          />
          <button type="button" onClick={onClose} aria-label="fechar" className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Screens() {
  const [tab, setTab] = useState<Tab>('lojista')
  const [idx, setIdx] = useState(0)
  const [zoom, setZoom] = useState<Shot | null>(null)
  const shots = SCREENS[tab].shots
  const cur = shots[Math.min(idx, shots.length - 1)]

  // troca automática a cada 6s (pausa se o usuário escolher)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || tab === 'mobile') return
    const t = setInterval(() => setIdx((i) => (i + 1) % shots.length), 6000)
    return () => clearInterval(t)
  }, [auto, tab, shots.length])

  return (
    <section id="telas" className="scroll-mt-20 pt-24">
      <SectionHead
        center
        eyebrow="o protótipo"
        title="Telas de verdade, não slides."
        text="O protótipo funciona de ponta a ponta: troque de perfil no topo e veja o mesmo pedido passar pelo lojista, pela associação e pela startup."
      />

      <div className="mt-8 flex justify-center">
        <div role="tablist" aria-label="perfil" className="no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full bg-fill p-[3px]">
          {(Object.keys(SCREENS) as Tab[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => {
                setTab(k)
                setIdx(0)
              }}
              className={`relative h-9 shrink-0 rounded-full px-4 text-[13px] font-medium transition-colors ${tab === k ? 'text-text' : 'text-mute hover:text-text'}`}
            >
              {tab === k && <motion.span layoutId="screens-pill" className="absolute inset-0 rounded-full bg-card shadow-[0_1px_3px_rgb(0_0_0/0.12)]" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
              <span className="relative">{SCREENS[k].label}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === 'mobile' ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {shots.map((s, i) => (
            <motion.button
              key={s.src}
              type="button"
              onClick={() => setZoom(s)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className={`group grid gap-3 text-left ${i === 2 ? 'max-sm:hidden' : ''}`}
            >
              <span className="block overflow-hidden rounded-[30px] border-[6px] border-ink-card bg-ink-card shadow-lift transition-transform duration-500 ease-out-quint group-hover:-translate-y-1">
                <img src={s.src} alt={s.title} loading="lazy" className="block w-full rounded-[24px]" />
              </span>
              <span className="grid gap-0.5 px-1">
                <b className="text-[13.5px] font-semibold">{s.title}</b>
                <span className="text-[12px] leading-snug text-mute">{s.text}</span>
              </span>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <button type="button" onClick={() => setZoom(cur)} className="group relative block text-left" aria-label={`ampliar ${cur.title}`}>
            <BrowserFrame>
              <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={cur.src}
                    src={cur.src}
                    alt={cur.title}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>
            </BrowserFrame>
            <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-card/90 text-mute opacity-0 shadow-card transition-opacity group-hover:opacity-100">
              <ArrowsOut className="size-4" />
            </span>
          </button>

          <ol className="no-scrollbar flex gap-2 overflow-x-auto lg:grid lg:content-start lg:overflow-visible">
            {shots.map((s, i) => {
              const on = s === cur
              return (
                <li key={s.src} className="w-[220px] shrink-0 lg:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIdx(i)
                      setAuto(false)
                    }}
                    className={`relative grid h-full w-full gap-1 overflow-hidden rounded-[16px] border p-3.5 text-left transition-colors ${
                      on ? 'border-accent bg-accent-soft/60' : 'border-line bg-card hover:bg-well'
                    }`}
                  >
                    <b className="text-[13.5px] font-semibold">{s.title}</b>
                    <span className="text-[12px] leading-snug text-mute">{s.text}</span>
                    {on && auto && (
                      <motion.i
                        key={`${tab}-${i}`}
                        className="absolute bottom-0 left-0 h-[3px] bg-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 6, ease: 'linear' }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      <Lightbox shot={zoom} onClose={() => setZoom(null)} />
    </section>
  )
}
