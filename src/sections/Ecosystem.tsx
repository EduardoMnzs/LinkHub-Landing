import { ArrowClockwise } from '@phosphor-icons/react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FLOWS, ROLES, type Msg, type Role } from '../content'
import { Avatar, EASE, Logo, SectionHead } from '../ui'

type Lane = Role | 'linkhub'
const LANES: Lane[] = ['lojista', 'linkhub', 'associacao', 'startup']
const LABEL: Record<Lane, string> = { lojista: 'Lojista', linkhub: 'LinkHub', associacao: 'Associação', startup: 'Startup' }

function LaneHead({ lane }: { lane: Lane }) {
  return (
    <div className="grid justify-items-center gap-1.5 text-center">
      {lane === 'linkhub' ? (
        <span className="grid size-11 place-items-center rounded-full bg-accent-soft">
          <Logo word={false} size={30} />
        </span>
      ) : (
        <Avatar size={44} {...ROLES[lane]} alt={ROLES[lane].label} />
      )}
      <b className="text-[13px] font-semibold">{LABEL[lane]}</b>
    </div>
  )
}

/** Uma mensagem do diagrama de sequência (desktop): seta entre duas raias + balão. */
function Arrow({ m, i, play }: { m: Msg; i: number; play: boolean }) {
  const a = LANES.indexOf(m.from)
  const b = LANES.indexOf(m.to)
  const left = ((Math.min(a, b) + 0.5) / LANES.length) * 100
  const width = (Math.abs(b - a) / LANES.length) * 100
  const right = b > a
  const delay = 0.15 + i * 0.55
  return (
    <div className="relative pt-3 pb-7">
      {/* balão: ocupa espaço próprio, centralizado sobre a seta */}
      <div className="relative z-10 w-max -translate-x-1/2" style={{ marginLeft: `${left + width / 2}%`, maxWidth: `max(${width}%, 300px)` }}>
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={play ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.45, ease: EASE, delay: delay + 0.25 }}
          className="grid gap-0.5 rounded-[14px] border border-line bg-card px-3 py-2 text-center shadow-card"
        >
          <span className="text-[12.5px] leading-snug font-medium">{m.text}</span>
          {m.detail && <span className="text-[11px] leading-snug text-mute">{m.detail}</span>}
        </motion.div>
      </div>
      {/* seta */}
      <div className="absolute bottom-3 h-[2px]" style={{ left: `${left}%`, width: `${width}%` }}>
        <motion.span
          className="absolute inset-0 rounded-full bg-accent"
          style={{ originX: right ? 0 : 1 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: play ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE, delay }}
        />
        <motion.svg
          viewBox="0 0 10 10"
          className={`absolute top-1/2 size-3 -translate-y-1/2 text-accent ${right ? '-right-1' : '-left-1 rotate-180'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={{ duration: 0.2, delay: delay + 0.45 }}
        >
          <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
        </motion.svg>
        <motion.span
          className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/20"
          style={{ [right ? 'left' : 'right']: -5 }}
          initial={{ scale: 0 }}
          animate={{ scale: play ? 1 : 0 }}
          transition={{ duration: 0.3, delay }}
        />
      </div>
    </div>
  )
}

/** Versão mobile: lista de mensagens "de → para". */
function MobileStep({ m, i }: { m: Msg; i: number }) {
  const who = (l: Lane) =>
    l === 'linkhub' ? (
      <span className="grid size-7 place-items-center rounded-full bg-accent-soft">
        <Logo word={false} size={20} />
      </span>
    ) : (
      <Avatar size={28} {...ROLES[l]} alt={LABEL[l]} />
    )
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
      className="relative grid gap-2 rounded-[18px] border border-line bg-card p-4"
    >
      <span className="flex items-center gap-2 text-[11.5px] text-mute">
        <span className="grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-on-accent">{i + 1}</span>
        {who(m.from)}
        <b className="font-semibold text-text">{LABEL[m.from]}</b>
        <span>→</span>
        {who(m.to)}
        <b className="font-semibold text-text">{LABEL[m.to]}</b>
      </span>
      <span className="text-[14px] leading-snug font-medium">{m.text}</span>
      {m.detail && <span className="text-[12.5px] leading-snug text-mute">{m.detail}</span>}
    </motion.li>
  )
}

export function Ecosystem() {
  const [flow, setFlow] = useState<'com' | 'sem'>('com')
  const [run, setRun] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (!inView) return
    setPlay(false)
    const t = setTimeout(() => setPlay(true), 60)
    return () => clearTimeout(t)
  }, [inView, flow, run])
  const f = FLOWS[flow]

  return (
    <section id="ecossistema" className="scroll-mt-20 pt-24">
      <SectionHead
        center
        eyebrow="como o ecossistema conversa"
        title="Três lados, uma conversa."
        text="A associação comercial fica no meio: aproxima o lojista de soluções compatíveis e transforma o que ainda não tem solução em briefing para startups."
      />

      {/* papéis */}
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {(Object.keys(ROLES) as Role[]).map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className="grid content-start gap-2 card p-5"
          >
            <span className="flex items-center gap-3">
              <Avatar size={40} {...ROLES[r]} alt={ROLES[r].label} />
              <span className="grid">
                <b className="text-[15px] font-semibold">{ROLES[r].label}</b>
                <span className="text-[11.5px] text-mute">{ROLES[r].who}</span>
              </span>
            </span>
            <p className="text-[13px] leading-[1.6] text-mute">{ROLES[r].line}</p>
          </motion.div>
        ))}
      </div>

      {/* diagrama */}
      <div ref={ref} className="mt-6 overflow-hidden rounded-[22px] border border-line bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 sm:px-6">
          <div role="tablist" aria-label="cenário" className="inline-flex rounded-full bg-fill p-[3px]">
            {(Object.keys(FLOWS) as ('com' | 'sem')[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={flow === k}
                onClick={() => setFlow(k)}
                className={`relative h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors ${flow === k ? 'text-text' : 'text-mute hover:text-text'}`}
              >
                {flow === k && (
                  <motion.span layoutId="flow-pill" className="absolute inset-0 rounded-full bg-card shadow-[0_1px_3px_rgb(0_0_0/0.12)]" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
                )}
                <span className="relative">{FLOWS[k].title}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setRun((n) => n + 1)} className="press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-mute hover:bg-well hover:text-text">
            <ArrowClockwise className="size-3.5" /> repetir
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={flow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-4 text-[13.5px] leading-[1.6] text-mute sm:px-6"
          >
            {f.summary}
          </motion.p>
        </AnimatePresence>

        {/* desktop: raias */}
        <div className="relative hidden px-6 pt-6 pb-8 md:block">
          <div className="grid grid-cols-4">
            {LANES.map((l) => (
              <LaneHead key={l} lane={l} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-6 top-[96px] bottom-6 grid grid-cols-4">
            {LANES.map((l) => (
              <span key={l} className="mx-auto w-px border-l border-dashed border-line-strong" />
            ))}
          </div>
          <div key={`${flow}-${run}`} className="relative mt-4 grid gap-1">
            {f.steps.map((m, i) => (
              <Arrow key={i} m={m} i={i} play={play} />
            ))}
          </div>
        </div>

        {/* mobile: lista */}
        <ol key={`m-${flow}`} className="grid gap-2.5 p-4 md:hidden">
          {f.steps.map((m, i) => (
            <MobileStep key={i} m={m} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
