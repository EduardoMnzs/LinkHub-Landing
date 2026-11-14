import { ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { NETWORK, type NetworkItem } from '../content'
import { EASE, Reveal, SectionHead } from '../ui'

function Card({ it, i }: { it: NetworkItem; i: number }) {
  const body = (
    <>
      <span className="relative block h-14 overflow-hidden" style={{ background: it.color }}>
        <span aria-hidden className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(120% 140% at 100% 0%, rgb(255 255 255 / 0.26), transparent 55%)' }} />
        <span aria-hidden className="absolute -right-4 -bottom-7 size-20 rounded-full border border-white/20" />
        <span aria-hidden className="absolute right-6 -bottom-10 size-20 rounded-full border border-white/15" />
      </span>
      <span className="relative -mt-7 grid gap-2 px-5 pb-5">
        <span className="grid size-14 place-items-center overflow-hidden rounded-[15px] shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-4 ring-card" style={{ background: it.logo.bg, padding: it.logo.pad }}>
          <img src={it.logo.src} alt={`Logo ${it.name}`} loading="lazy" draggable={false} className="size-full object-contain" />
        </span>
        <span className="grid gap-0.5">
          <span className="flex items-center gap-1.5">
            <b className="text-[16px] font-semibold tracking-[-0.01em]">{it.name}</b>
            {it.url && <ArrowUpRight className="size-3.5 text-faint transition-colors group-hover:text-accent-ink" />}
          </span>
          <span className="font-mono text-[9px] tracking-[0.08em] text-faint uppercase">{it.kind}</span>
        </span>
        <span className="text-[13px] leading-[1.6] text-mute">{it.text}</span>
        <span className="mt-1 border-t border-line pt-3 text-[12.5px] leading-[1.55]">
          <b className="font-semibold text-accent-ink">No LinkHub: </b>
          {it.role.replace(/^No LinkHub:\s*/, '')}
        </span>
      </span>
    </>
  )
  const cls = 'group block h-full overflow-hidden rounded-[20px] bg-card text-left shadow-card transition-shadow'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.07 }}
    >
      {it.url ? (
        <a href={it.url} target="_blank" rel="noopener noreferrer" className={`${cls} hover:shadow-lift`}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.div>
  )
}

/** Ecossistema real de Marília e da Alta Paulista. */
export function Network() {
  return (
    <section id="rede" className="scroll-mt-20 pt-24">
      <SectionHead
        eyebrow="quem está na rede · Marília e Alta Paulista"
        title="Um ecossistema que já existe."
        text="O LinkHub nasce em Marília: a ACIM Connect no centro, o CITAP apoiando pilotos de Agro 4.0 e startups da região resolvendo dores reais do comércio local."
      />
      <Reveal className="mt-8">
        <span className="eyebrow">parceiros</span>
      </Reveal>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {NETWORK.partners.map((it, i) => (
          <Card key={it.name} it={it} i={i} />
        ))}
      </div>
      <Reveal className="mt-8">
        <span className="eyebrow">startups</span>
      </Reveal>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {NETWORK.startups.map((it, i) => (
          <Card key={it.name} it={it} i={i} />
        ))}
      </div>
      <p className="mt-4 text-[11.5px] leading-[1.6] text-faint">
        As descrições das empresas foram tiradas dos sites de cada uma.
      </p>
    </section>
  )
}
