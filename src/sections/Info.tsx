import { Check, Flask, Question } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { CRITERIA, FACTS, HYPOTHESES, IDEAS, PROFILES, SIMULATED } from '../content'
import { EASE, Reveal, SectionHead } from '../ui'

const card = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 },
})

export function Info() {
  return (
    <>
      {/* números */}
      <section aria-label="Contexto" className="pt-24">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <motion.div key={f.n} {...card(i)} className="grid content-start gap-1 card p-5">
              <b className="display text-[34px] leading-none font-semibold tracking-[-0.04em] text-accent-ink tabular">{f.n}</b>
              <span className="text-[12.5px] leading-snug text-mute">{f.label}</span>
              {f.src && <span className="mt-1 font-mono text-[9px] tracking-[0.08em] text-faint uppercase">{f.src}</span>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ideias */}
      <section id="ideias" className="scroll-mt-20 pt-24">
        <SectionHead eyebrow="ideias" title="O que faz o LinkHub diferente." text="Pensado para quem toca a loja no dia a dia — e para a associação que precisa mostrar resultado para a rede." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {IDEAS.map((it, i) => (
            <motion.div key={it.title} {...card(i)} className="group grid content-start gap-2 card p-5 transition-shadow hover:shadow-lift">
              <span className="grid size-11 place-items-center rounded-[14px] bg-well text-[22px] transition-transform duration-500 ease-out-quint group-hover:scale-110 group-hover:-rotate-6">
                {it.emoji}
              </span>
              <b className="mt-1 text-[15px] leading-snug font-semibold">{it.title}</b>
              <p className="text-[12.5px] leading-[1.6] text-mute">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* desafio */}
      <section id="desafio" className="scroll-mt-20 pt-24">
        <SectionHead
          eyebrow="o desafio FACESP"
          title="Critérios de sucesso, um por um."
          text="“Conecte necessidades de pequenos varejistas a tecnologias de startups e transforme demandas ainda sem resposta em oportunidades de desenvolvimento conjunto.”"
        />
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {CRITERIA.map((c, i) => (
            <motion.div key={c.who} {...card(i)} className="grid content-start gap-3 card p-5">
              <span className="eyebrow">{c.who}</span>
              <b className="text-[15px] leading-snug font-semibold">{c.criterion}</b>
              <ul className="grid gap-1.5 border-t border-line pt-3">
                {c.how.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[12.5px] leading-snug">
                    <Check weight="bold" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* perfis de associação */}
        <Reveal className="mt-12 grid gap-1">
          <span className="eyebrow">associações de perfis diferentes</span>
          <h3 className="display text-[22px] leading-tight font-semibold tracking-[-0.03em]">A mesma base, ajustada à realidade local.</h3>
        </Reveal>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {PROFILES.map((p, i) => (
            <motion.div key={p.title} {...card(i)} className="grid content-start gap-2 rounded-[20px] border border-dashed border-line-strong bg-well p-5">
              <span className="text-[26px] leading-none">{p.emoji}</span>
              <b className="text-[15px] font-semibold">{p.title}</b>
              <span className="text-[11.5px] text-mute">{p.size}</span>
              <ul className="mt-1 grid gap-1.5">
                {p.tweaks.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[12.5px] leading-snug">
                    <i className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* hipóteses e simulações */}
        <div className="mt-12 grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <motion.div {...card(0)} className="grid content-start gap-3 card p-5">
            <span className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-burn-soft text-burn">
                <Question weight="bold" className="size-4" />
              </span>
              <b className="text-[15px] font-semibold">Hipóteses que ainda precisam de validação</b>
            </span>
            <ol className="grid gap-2">
              {HYPOTHESES.map((h, i) => (
                <li key={h} className="flex items-start gap-2.5 text-[13px] leading-snug">
                  <span className="mt-px font-mono text-[11px] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </li>
              ))}
            </ol>
          </motion.div>
          <motion.div {...card(1)} className="grid content-start gap-3 rounded-[20px] bg-ink-card p-5 text-[#efebe4]">
            <span className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-white/10">
                <Flask weight="duotone" className="size-4" />
              </span>
              <b className="text-[15px] font-semibold">O que é simulado no protótipo</b>
            </span>
            <ul className="grid gap-2">
              {SIMULATED.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[13px] leading-snug text-white/75">
                  <i className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[11.5px] leading-snug text-white/50">Dados públicos de referência: TIC Empresas 2025 (Cetic.br), IBGE — Pesquisa Anual de Comércio, Sebrae — Catalisa MPE.</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
