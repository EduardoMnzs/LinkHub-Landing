# LinkHub — Landing page

Landing do **LinkHub**, protótipo para o desafio **FACESP**: conectar necessidades de pequenos varejistas a tecnologias de startups e transformar demandas sem resposta em oportunidades de desenvolvimento conjunto.

Mesma identidade visual do app ([LinkHub-Frontend](https://github.com/EduardoMnzs/LinkHub-Frontend)): fundo creme, verde do dinossauro, Geist + Geist Mono.

## Seções

- **Topo** — proposta em uma frase e chamadas para o protótipo.
- **O que os lojistas estão pedindo** — quadro interativo (busca, filtros por status, “tenho a mesma necessidade”).
- **Como o ecossistema conversa** — diagrama de sequência animado entre Lojista, LinkHub, Associação e Startup, nos cenários *existe solução* e *não existe solução*.
- **Telas** — prints reais do protótipo por perfil (lojista, associação, startup e mobile), com ampliação.
- **Ideias**, **critérios de sucesso do desafio**, **associações de perfis diferentes**, **hipóteses a validar** e **o que é simulado**.

## Rodar

```bash
npm install
npm run dev
npm run build
```

O botão “Ver o protótipo” aponta para `VITE_APP_URL` (padrão `http://localhost:5173`). No deploy:

```bash
VITE_APP_URL=https://seu-prototipo.vercel.app npm run build
```

Os textos ficam todos em `src/content.ts`; os prints em `public/prints/`.

> Dados fictícios. Respostas de startups, testes e pagamentos são simulados no protótipo.
