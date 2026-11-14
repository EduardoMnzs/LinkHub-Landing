import { motion } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Aparece ao entrar na tela (uma vez). */
export function Reveal({ children, delay = 0, className = '', y = 14 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Logo({ word = true, size = 28 }: { word?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        src="/images/dino-96.png"
        alt=""
        width={size}
        height={size}
        draggable={false}
        className="object-contain drop-shadow-[0_2px_3px_rgb(43_39_34/0.18)]"
        style={{ width: size, height: size }}
      />
      {word && <b className="display text-[15px] font-semibold tracking-tight">LinkHub</b>}
    </span>
  )
}

/** Avatar: círculo com a cor misturada ao card e o ícone centralizado. */
export function Avatar({ size, color, emoji, src, alt = '', className = '' }: { size: number; color: string; emoji?: string; src?: string; alt?: string; className?: string }) {
  const style: CSSProperties = { width: size, height: size, background: `color-mix(in srgb, ${color} 30%, var(--card))` }
  return (
    <span className={`relative inline-grid shrink-0 overflow-hidden rounded-full align-top ${className}`} style={style}>
      {src ? (
        <img alt={alt} draggable={false} className="absolute inset-0 m-auto h-[72%] w-[72%] object-contain" src={src} />
      ) : (
        <span role="img" aria-label={alt} className="absolute inset-0 grid place-items-center leading-none select-none" style={{ fontSize: size * 0.52 }}>
          {emoji}
        </span>
      )}
    </span>
  )
}

/** Cabeçalho de seção: rótulo mono + título + texto. */
export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={`grid gap-2 ${center ? 'justify-items-center text-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display text-[28px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[36px]">{title}</h2>
      {text && <p className={`text-[15px] leading-[1.7] text-mute ${center ? 'max-w-[560px]' : 'max-w-[620px]'}`}>{text}</p>}
    </Reveal>
  )
}

/** Moldura de navegador (bolinhas + URL), igual aos cards do app. */
export function BrowserFrame({ url = 'linkhub.app', children, className = '' }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[18px] bg-card shadow-lift ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-well px-3.5">
        <i className="size-2.5 rounded-full bg-[#ff5f57]" />
        <i className="size-2.5 rounded-full bg-[#febc2e]" />
        <i className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto max-w-[50%] truncate rounded-full bg-fill px-3 text-[11px] leading-[1.8] text-mute">{url}</span>
      </div>
      {children}
    </div>
  )
}

export function Pill({ children, tone = 'fill' }: { children: ReactNode; tone?: 'fill' | 'accent' | 'burn' | 'line' }) {
  const t = {
    fill: 'bg-fill text-mute',
    accent: 'bg-accent-soft text-accent-ink',
    burn: 'bg-burn-soft text-burn',
    line: 'border border-line-strong text-mute',
  }[tone]
  return <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-medium whitespace-nowrap ${t}`}>{children}</span>
}
