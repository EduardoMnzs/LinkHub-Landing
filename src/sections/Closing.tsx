import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { APP_URL, REPO_URL } from '../content'
import { EASE } from '../ui'

/** Fechamento: mascote + frase + botão. */
export function Closing() {
  return (
    <section className="grid justify-items-center px-4 pt-28 pb-20 text-center">
      <motion.img
        src="/images/dino.png"
        alt=""
        draggable={false}
        initial={{ opacity: 0, y: 30, rotate: 8 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        whileHover={{ rotate: -6, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="size-28 object-contain drop-shadow-[0_10px_18px_rgb(43_39_34/0.18)]"
      />
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="mt-6 text-[26px] leading-tight font-[650] tracking-[-0.035em] sm:text-[30px]"
      >
        Sua associação também cabe nessa conversa.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
        className="mt-3 max-w-[460px] text-[14px] leading-[1.7] text-mute"
      >
        Lojistas pedindo, startups resolvendo e a associação no centro — com curadoria, dados da rede e um modelo que outras associações podem
        reaproveitar.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
      >
        <a href={APP_URL} className="press group inline-flex h-[42px] items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-on-accent hover:bg-accent-hover">
          Abrir o protótipo
          <ArrowRight weight="bold" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a href={REPO_URL} className="text-[12px] text-mute hover:text-text">
          Ver o código no GitHub
        </a>
      </motion.div>
    </section>
  )
}
