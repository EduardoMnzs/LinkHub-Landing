import { CaretUp, MagnifyingGlass } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { BOARD, type BoardStatus } from '../content'
import { EASE, Pill } from '../ui'

const STATUS: BoardStatus[] = ['com solução', 'em teste', 'em triagem', 'oportunidade']
const TONE: Record<BoardStatus, 'accent' | 'fill' | 'burn' | 'line'> = {
  'com solução': 'accent',
  'em teste': 'fill',
  'em triagem': 'burn',
  oportunidade: 'line',
}

/** Quadro em tabela: o que os lojistas da rede estão pedindo. */
export function Board() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<BoardStatus | 'todos'>('todos')
  const [sort, setSort] = useState<'lojistas' | 'az'>('lojistas')
  const [voted, setVoted] = useState<Record<string, boolean>>({})

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase()
    return BOARD.filter((r) => (status === 'todos' || r.status === status) && (!t || `${r.need} ${r.category} ${r.segment}`.toLowerCase().includes(t)))
      .map((r) => ({ ...r, stores: r.stores + (voted[r.need] ? 1 : 0) }))
      .sort((a, b) => (sort === 'lojistas' ? b.stores - a.stores : a.need.localeCompare(b.need)))
  }, [q, status, sort, voted])

  return (
    <section id="demandas" aria-label="O que os lojistas estão pedindo" className="overflow-hidden rounded-[22px] border border-line bg-card">
      <div className="grid gap-4 p-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <span className="eyebrow">Feito pela rede</span>
            <h3 className="text-[19px] leading-[1.5] font-semibold tracking-[-0.5px]">O que os lojistas estão pedindo</h3>
          </div>
          <span className="pt-2.5 text-[11px] whitespace-nowrap text-mute">{BOARD.length} necessidades</span>
        </div>

        <div className="flex gap-2.5">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-chrome px-[13px] text-mute focus-within:ring-2 focus-within:ring-accent/40">
            <MagnifyingGlass className="size-4 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por necessidade, segmento ou tema"
              aria-label="Buscar necessidades"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-text outline-none placeholder:text-mute"
            />
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'lojistas' | 'az')}
            aria-label="Ordenar"
            className="h-10 shrink-0 rounded-full border border-line bg-well px-3 text-[11px] text-text outline-none"
          >
            <option value="lojistas">Mais lojistas</option>
            <option value="az">A–Z</option>
          </select>
        </div>

        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1" role="group" aria-label="Status">
          {(['todos', ...STATUS] as const).map((s) => {
            const on = status === s
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => setStatus(s)}
                className={`press h-[29px] shrink-0 rounded-full border px-[11px] text-[11px] capitalize transition-colors ${
                  on ? 'border-accent bg-accent-soft text-accent-ink' : 'border-transparent bg-chrome text-mute hover:text-text'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* cabeçalho da tabela */}
      <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 border-y border-line bg-well px-5 py-2 text-[10px] text-mute sm:grid-cols-[28px_minmax(0,1fr)_150px_110px_56px] sm:px-6">
        <span>#</span>
        <span>Necessidade</span>
        <span className="max-sm:hidden">Segmento</span>
        <span className="max-sm:hidden">Status</span>
        <span className="text-right sm:text-center">Lojistas</span>
      </div>

      <ol className="divide-y divide-line">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r, i) => (
            <motion.li
              key={r.need}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 transition-colors hover:bg-well/60 sm:grid-cols-[28px_minmax(0,1fr)_150px_110px_56px] sm:px-6"
            >
              <span className="text-[11px] text-mute tabular">{i + 1}</span>
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-well text-[18px]">{r.emoji}</span>
                <span className="grid min-w-0 gap-0.5">
                  <b className="line-clamp-2 text-[13.5px] leading-snug font-semibold sm:truncate">{r.need}</b>
                  <span className="flex min-w-0 items-center gap-2 text-[11.5px] text-mute">
                    <span className="truncate">{r.category}</span>
                    <span className="sm:hidden">
                      <Pill tone={TONE[r.status]}>{r.status}</Pill>
                    </span>
                  </span>
                </span>
              </span>
              <span className="truncate text-[12px] text-mute max-sm:hidden">{r.segment}</span>
              <span className="max-sm:hidden">
                <Pill tone={TONE[r.status]}>{r.status}</Pill>
              </span>
              <button
                type="button"
                aria-pressed={!!voted[r.need]}
                aria-label={`Tenho a mesma necessidade: ${r.need}`}
                title="Tenho a mesma necessidade"
                onClick={() => setVoted((v) => ({ ...v, [r.need]: !v[r.need] }))}
                className={`press grid h-10 w-11 place-items-center justify-self-end rounded-[10px] border text-[12px] font-semibold tabular sm:justify-self-center ${
                  voted[r.need] ? 'border-accent bg-accent-soft text-accent-ink' : 'border-line-strong bg-card hover:bg-well'
                }`}
              >
                <CaretUp weight="bold" className="size-3" />
                <span className="-mt-1">{r.stores}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
        {rows.length === 0 && <li className="px-6 py-10 text-center text-[13px] text-mute">Nenhuma necessidade com esse filtro.</li>}
      </ol>

      <p className="border-t border-line bg-well px-6 py-3 text-center text-[11px] text-mute">
        Dados fictícios do protótipo · clique em ▲ para dizer “tenho a mesma necessidade”
      </p>
    </section>
  )
}
