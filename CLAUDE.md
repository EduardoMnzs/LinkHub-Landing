# LinkHub — landing page

Página de apresentação do **LinkHub** (desafio FACESP · ACIM Connect Marília): proposta, como o ecossistema conversa, quem está na rede, prints do protótipo, ideias e critérios do desafio.

- Produção: https://linkhub.gaek.com.br (Cloudflare Pages)
- App/protótipo: repositório `LinkHub-Frontend` → https://linkhub-plataform.gaek.com.br

## Comandos

```bash
npm install
npm run dev      # Vite (porta livre, ex.: 5175 se o app estiver na 5173)
npm run build    # tsc -b && vite build → dist/
```

Rode `npx tsc -b` depois de editar; não há testes.

## Stack

React 19 · TypeScript · Vite 8 (Node 22, ver `.node-version`) · Tailwind CSS v4 · Motion · Phosphor Icons · Geist + Geist Mono. Mesmos tokens de cor do app (`src/index.css`, tema claro/escuro via `data-theme`).

## Estrutura

- `src/content.ts` — **todo o texto e os dados** da página: `APP_URL`, `REPO_URL`, `ROLES`, `BOARD` (quadro de pedidos), `FLOWS` (diagrama), `NETWORK` (parceiros e startups reais), `SCREENS` (prints), `IDEAS`, `CRITERIA`, `PROFILES`, `HYPOTHESES`, `SIMULATED`, `FACTS`. Para mudar copy, edite aqui.
- `src/App.tsx` — topo (hero), barra flutuante, tema e ordem das seções.
- `src/sections/` — `Board` (tabela), `Ecosystem` (diagrama de sequência animado com raias Lojista/LinkHub/Associação/Startup; vira lista no mobile), `Network` (quem está na rede, com logos), `Screens` (prints com abas e ampliação), `Info` (números, ideias, critérios, perfis, hipóteses), `Closing`.
- `src/ui.tsx` — `Reveal`, `SectionHead`, `Avatar` (ícone centralizado), `BrowserFrame`, `Pill`, `Logo`.
- `public/prints/` — prints reais do app em 2× (JPEG). `public/logos/` — logos oficiais (ACIM, CITAP, GaekWare, SinalTerra, Shield-ACK). `public/images/` — dinossauro da marca.

## Convenções e armadilhas

- **Link do protótipo:** `APP_URL` usa `VITE_APP_URL` se definida; senão aponta para produção. Para testar local: `VITE_APP_URL=http://localhost:5173 npm run dev`.
- **Prints desatualizados:** quando o app mudar, regere `public/prints/*.jpg` a partir do app rodando (viewport 1440×900 e 390×844, `deviceScaleFactor: 2`, perfis trocados via `localStorage` `linkhub-facesp-v2` = `{ "role": "..." }`). Mantenha os mesmos nomes de arquivo usados em `SCREENS`.
- **Logos:** quadrados em 256 px; o card define fundo e respiro em `NETWORK[].logo` (`bg`, `pad`). Os de CITAP e SinalTerra são recortes só do símbolo.
- **Tailwind v4:** se um arquivo novo não ganhar estilo com o dev server rodando, toque em `src/index.css` ou reinicie.
- **Grid:** mesma regra base do app (`.grid { grid-template-columns: minmax(0,1fr) }`) — não remover.
- **Sem publicidade na página:** as colunas de anúncios foram removidas a pedido; o tema só aparece como ideia e no print da tela de Anúncios.
- **Sem emojis em elementos de marca:** cards de empresas usam logo; avatares das personas usam emoji centralizado.
- Não citar o site usado como referência visual no código nem na página.
- Responsivo: validar em 390 px e 1440 px sem rolagem horizontal.
- Copy em **pt-BR**.

## Dados reais × fictícios

Parceiros e startups em `NETWORK` são reais, com descrições tiradas dos sites oficiais e links verificados. Lojas, pedidos e números do quadro são ilustrativos (bairros de Marília são reais).

## Deploy (Cloudflare Pages)

Build `npm run build`, saída `dist`. `public/_headers` define cache longo para `/assets/*`. Página única com âncoras (`#ecossistema`, `#rede`, `#telas`, `#ideias`, `#desafio`).
