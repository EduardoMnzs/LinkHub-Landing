// Todo o texto da landing fica aqui para facilitar ajustes.

/** Link do protótipo (pode ser sobrescrito com VITE_APP_URL, ex.: para testar local). */
export const APP_URL = (import.meta.env.VITE_APP_URL as string | undefined) ?? 'https://linkhub-plataform.gaek.com.br'
export const SITE_URL = 'https://linkhub.gaek.com.br'
export const REPO_URL = 'https://github.com/EduardoMnzs/LinkHub-Frontend'

export type Role = 'lojista' | 'associacao' | 'startup'

export const ROLES: Record<Role, { label: string; who: string; color: string; emoji?: string; src?: string; line: string }> = {
  lojista: {
    label: 'Lojista',
    who: 'Marina · Empório Bom Grão, Centro de Marília',
    color: '#E08144',
    emoji: '🧺',
    line: 'Conta o que precisa em uma frase e recebe soluções que cabem na realidade da loja — com o porquê.',
  },
  associacao: {
    label: 'Associação',
    who: 'Carlos · ACIM Connect Marília',
    color: '#8FA67F',
    emoji: '🏛️',
    line: 'Faz a curadoria: aprova startups e anúncios, qualifica demandas sem solução e mede o impacto na rede.',
  },
  startup: {
    label: 'Startup',
    who: 'Equipe · GaekWare',
    color: '#7FA6C8',
    emoji: '🚀',
    line: 'Entra no catálogo da rede, recebe pedidos de teste e briefings de demandas reais para desenvolver junto.',
  },
}

/* ───────── quadro "o que os lojistas mais pedem" ───────── */
export type BoardStatus = 'com solução' | 'em teste' | 'em triagem' | 'oportunidade'
export const BOARD: { need: string; category: string; emoji: string; segment: string; stores: number; status: BoardStatus }[] = [
  { need: 'Dividir a entrega entre lojas vizinhas', category: 'Logística & entrega', emoji: '🛵', segment: 'Papelaria · Av. Sampaio Vidal', stores: 23, status: 'oportunidade' },
  { need: 'Vender pelo Instagram sem responder tudo na mão', category: 'Vendas & WhatsApp', emoji: '💬', segment: 'Mercearia · Centro', stores: 14, status: 'com solução' },
  { need: 'Cobrar o fiado sem constrangimento', category: 'Pagamentos & crédito', emoji: '📒', segment: 'Mercearia · Palmital', stores: 12, status: 'com solução' },
  { need: 'Comparar opções de crédito para estoque de fim de ano', category: 'Pagamentos & crédito', emoji: '💳', segment: 'Bazar · Palmital', stores: 9, status: 'em triagem' },
  { need: 'Mostrar ao produtor o resultado dos insumos', category: 'Dados & inteligência', emoji: '🛰️', segment: 'Revenda agro · Distrito Industrial', stores: 8, status: 'em teste' },
  { need: 'Responder clientes no WhatsApp fora do horário', category: 'Atendimento', emoji: '🌙', segment: 'Pet shop · Fragata', stores: 7, status: 'com solução' },
  { need: 'Saber quais produtos estão parados no estoque', category: 'Gestão & estoque', emoji: '📦', segment: 'Mercearia · Centro', stores: 6, status: 'em teste' },
  { need: 'Provador virtual de óculos no Instagram', category: 'Marketing & redes', emoji: '👓', segment: 'Ótica · Marília Shopping', stores: 5, status: 'oportunidade' },
]

/* ───────── como o ecossistema conversa (diagrama de sequência) ───────── */
export type Msg = { from: Role | 'linkhub'; to: Role | 'linkhub'; text: string; detail?: string }
export const FLOWS: Record<'com' | 'sem', { title: string; summary: string; steps: Msg[] }> = {
  com: {
    title: 'Existe solução',
    summary: 'O lojista descobre, entende e testa em minutos — sem sair da plataforma da sua associação.',
    steps: [
      { from: 'lojista', to: 'linkhub', text: '“Quero vender pelo Instagram sem responder tudo na mão.”', detail: 'categoria, canais, porte e orçamento em 3 passos' },
      { from: 'linkhub', to: 'lojista', text: '3 soluções compatíveis, com o porquê', detail: '✓ funciona no WhatsApp e Instagram · ✓ cabe no orçamento · ✗ pensado para empresa pequena' },
      { from: 'lojista', to: 'startup', text: 'Pedido de teste grátis em 1 clique', detail: 'a startup recebe o perfil da loja, não dados de clientes' },
      { from: 'startup', to: 'lojista', text: '“Liberamos 14 dias. Te chamamos no WhatsApp para configurar!”', detail: 'ex.: Atendente 24/7 da Shield-ACK para responder fora do horário' },
      { from: 'lojista', to: 'associacao', text: 'Avaliação pós-teste', detail: 'vira reputação no catálogo: “18 lojas testaram, 11 continuaram”' },
    ],
  },
  sem: {
    title: 'Não existe solução',
    summary: 'A necessidade não se perde: vira um briefing qualificado e uma oportunidade de desenvolvimento conjunto.',
    steps: [
      { from: 'lojista', to: 'linkhub', text: '“Queria dividir a entrega com as lojas vizinhas.”' },
      { from: 'linkhub', to: 'associacao', text: 'Nenhuma solução compatível → triagem na ACIM Connect', detail: 'outros 23 lojistas do centro de Marília marcaram “tenho a mesma necessidade”' },
      { from: 'associacao', to: 'startup', text: 'Oportunidade publicada com hipóteses a validar', detail: 'perfil das lojas, canais, orçamento, nº de lojistas e lojas-piloto' },
      { from: 'startup', to: 'associacao', text: 'GaekWare: “Quero desenvolver junto.”', detail: 'conversa, piloto com lojas voluntárias e validação das hipóteses' },
      { from: 'associacao', to: 'lojista', text: 'Solução nova entra no catálogo da rede', detail: 'e sobe numa rodada de pitch no Connect ou no CITAP' },
    ],
  },
}

/* ───────── telas ───────── */
export type Shot = { src: string; title: string; text: string }
export const SCREENS: Record<Role | 'mobile', { label: string; shots: Shot[] }> = {
  lojista: {
    label: 'Lojista',
    shots: [
      { src: '/prints/lojista-inicio.jpg', title: 'Início do lojista', text: 'Pedidos em andamento, resposta da startup no teste, recomendações explicadas e um espaço patrocinado.' },
      { src: '/prints/lojista-match.jpg', title: 'Por que combina com você', text: 'Cada solução mostra o que atende (✓) e o que não atende (✗) em relação ao pedido da loja.' },
      { src: '/prints/lojista-pedidos.jpg', title: 'Meus pedidos', text: 'Linha do tempo do pedido → sugestões → teste → resolvido, com a conversa com a startup.' },
      { src: '/prints/lojista-catalogo.jpg', title: 'Catálogo da rede', text: 'Só soluções aprovadas pela associação, com filtros por problema, canal e teste grátis.' },
    ],
  },
  associacao: {
    label: 'Associação',
    shots: [
      { src: '/prints/associacao-inicio.jpg', title: 'Painel da associação', text: 'Pendências, o que os lojistas mais pedem por tema e a próxima rodada de pitch.' },
      { src: '/prints/associacao-demandas.jpg', title: 'Triagem de demandas', text: 'Sugerir uma solução existente ou qualificar e publicar como oportunidade — e levar o modelo para outra associação.' },
      { src: '/prints/associacao-aprovacoes.jpg', title: 'Curadoria', text: 'Checklist de aprovação de startups e anúncios: preço claro, teste grátis, LGPD, foco em MPE.' },
      { src: '/prints/associacao-inicio-dark.jpg', title: 'Tema escuro', text: 'Toda a interface tem tema claro e escuro.' },
    ],
  },
  startup: {
    label: 'Startup',
    shots: [
      { src: '/prints/startup-oportunidades.jpg', title: 'Oportunidades', text: 'Briefings de demandas reais: quantos lojistas têm a dor, perfil das lojas e hipóteses a validar.' },
      { src: '/prints/startup-inicio.jpg', title: 'Início da startup', text: 'Status das soluções enviadas, pedidos de teste recebidos e oportunidades abertas.' },
      { src: '/prints/startup-anuncios.jpg', title: 'Anúncios', text: 'Escolha o espaço, veja a prévia ao vivo e envie para revisão da associação.' },
      { src: '/prints/rodadas.jpg', title: 'Rodadas de pitch', text: 'Startups se apresentam para os lojistas da rede; a associação monta a ordem do palco.' },
    ],
  },
  mobile: {
    label: 'Mobile',
    shots: [
      { src: '/prints/mobile-lojista.jpg', title: 'Início no celular', text: 'Feito para quem toca a loja pelo celular.' },
      { src: '/prints/mobile-pedidos.jpg', title: 'Pedido no celular', text: 'Compatibilidade explicada também no mobile.' },
      { src: '/prints/mobile-startup.jpg', title: 'Oportunidades no celular', text: 'Startups acompanham demandas de qualquer lugar.' },
    ],
  },
}

/* ───────── ideias ───────── */
export const IDEAS: { emoji: string; title: string; text: string }[] = [
  { emoji: '🧭', title: 'Compatibilidade explicada', text: 'Nada de “recomendado para você” sem motivo: cada sugestão diz o que atende e o que não atende — canal, porte, orçamento e teste grátis.' },
  { emoji: '🧪', title: 'Teste em um clique', text: 'O lojista pede o teste direto na plataforma; a startup recebe o perfil da loja (nunca dados de clientes) e responde no mesmo lugar.' },
  { emoji: '🌱', title: 'Demanda sem solução vira oportunidade', text: 'Quando nada serve, a associação qualifica a necessidade, junta lojistas com a mesma dor e publica para startups desenvolverem junto.' },
  { emoji: '🛡️', title: 'Curadoria da associação', text: 'Só entra no catálogo quem passa pelo checklist: preço claro, teste grátis, privacidade, suporte em português e foco em MPE.' },
  { emoji: '📣', title: 'Publicidade que sustenta a rede', text: 'Três espaços patrocinados revisados pela associação — startups e empresas locais anunciam, a associação gera receita.' },
  { emoji: '🎤', title: 'Rodadas de pitch', text: 'Encontros temáticos onde startups apresentam para lojistas — o “Terça de SaaS” do varejo da cidade.' },
  { emoji: '🧩', title: 'Modelo replicável', text: 'Categorias, briefing e regra de compatibilidade exportáveis: outra associação reaproveita com ajustes locais.' },
  { emoji: '📊', title: 'Dados públicos como ponto de partida', text: 'TIC Empresas, IBGE e Sebrae orientam as categorias — e cada pedido gera um mapa vivo das dores do comércio local.' },
]

/* ───────── critérios de sucesso do desafio ───────── */
export const CRITERIA: { who: string; criterion: string; how: string[] }[] = [
  {
    who: 'Lojista',
    criterion: 'Entende por que uma solução é pertinente e consegue avançar.',
    how: ['Motivos ✓ e lacunas ✗ em cada sugestão', 'Teste grátis em 1 clique', 'Linha do tempo do pedido até “resolvido”'],
  },
  {
    who: 'Startup',
    criterion: 'Recebe informações suficientes para avaliar uma demanda.',
    how: ['Briefing com perfil, canais e orçamento', 'Nº de lojistas com a mesma dor', 'Hipóteses marcadas como “a validar”'],
  },
  {
    who: 'Outra associação',
    criterion: 'Consegue reaproveitar a abordagem com ajustes locais.',
    how: ['Kit exportável (categorias + briefing + regra de match)', 'Configuração local de região e categorias', 'Quem aprova é configurável'],
  },
]

/* ───────── perfis de associação ───────── */
export const PROFILES: { emoji: string; title: string; size: string; tweaks: string[] }[] = [
  {
    emoji: '🏘️',
    title: 'Cidade pequena',
    size: '~150 associados · comércio de bairro',
    tweaks: ['Pedido feito pelo atendente da associação no balcão', 'Foco em fiado, Pix e WhatsApp', 'Rodadas mensais presenciais'],
  },
  {
    emoji: '🏖️',
    title: 'Polo turístico ou regional',
    size: '~600 associados · sazonalidade forte',
    tweaks: ['Categorias de loja virtual e entrega', 'Anúncios concentrados na alta temporada', 'Oportunidades em grupo por rua ou polo'],
  },
  {
    emoji: '🏙️',
    title: 'Capital',
    size: '3.000+ associados · muitas startups',
    tweaks: ['Curadoria com mais critérios e prazo', 'Ranking de demandas por bairro', 'Integração com ecossistemas como o Connect'],
  },
]

/* ───────── hipóteses e o que é simulado ───────── */
export const HYPOTHESES = [
  'Lojistas descrevem a necessidade melhor em uma frase do que escolhendo de uma lista de produtos.',
  'Ver o porquê da compatibilidade aumenta a taxa de pedidos de teste.',
  'Startups topam teste grátis em troca de acesso qualificado à rede.',
  'A associação tem capacidade de fazer curadoria e triagem semanal.',
  'Anúncios revisados cobrem parte do custo de operar a plataforma.',
]
export const SIMULATED = [
  'Respostas das startups e liberação de testes',
  'Pagamento dos anúncios',
  'Integrações (WhatsApp, Connect, dados da FACESP)',
  'Lojas, startups e números exibidos — tudo fictício',
]

export const FACTS = [
  { n: '420', label: 'Associações Comerciais na rede FACESP' },
  { n: '300 mil', label: 'empreendedores associados no estado' },
  { n: '81%', label: 'das empresas de 10–49 pessoas que vendem online usam mensagens ou chats', src: 'TIC Empresas 2025' },
  { n: '30%', label: 'usam site próprio — os canais podem se sobrepor', src: 'TIC Empresas 2025' },
]

/* ───────── quem está na rede (Marília e Alta Paulista) ───────── */
/** logo: imagem em /public/logos · bg: fundo do quadrado · pad: respiro interno (0 = ocupa tudo) */
export type NetworkItem = {
  name: string
  kind: string
  logo: { src: string; bg: string; pad: number }
  color: string
  text: string
  role: string
  url?: string
}
export const NETWORK: { partners: NetworkItem[]; startups: NetworkItem[] } = {
  partners: [
    {
      name: 'ACIM Connect Marília',
      kind: 'associação comercial',
      logo: { src: '/logos/acim-icon.png', bg: '#ffffff', pad: 0 },
      color: '#0f7a3a',
      text: 'Ambiente de inovação da ACIM — Associação Comercial e de Inovação de Marília — que aproxima startups, investidores e empreendedores, com aceleração focada em soluções para o varejo.',
      role: 'No LinkHub: faz a curadoria, a triagem das demandas e organiza as rodadas de pitch.',
      url: 'https://acim.org.br/',
    },
    {
      name: 'CITAP',
      kind: 'centro de inovação · Pompeia',
      logo: { src: '/logos/citap-icon.png', bg: '#ffffff', pad: 7 },
      color: '#284755',
      text: 'Centro de Inovação Tecnológica da Alta Paulista, primeiro ambiente da região credenciado no SPAI, com foco em Agro 4.0, Saúde e Cidades Inteligentes.',
      role: 'No LinkHub: sedia rodadas de Agro 4.0 e apoia pilotos com laboratórios e startups incubadas.',
      url: 'https://citap.org.br',
    },
  ],
  startups: [
    {
      name: 'GaekWare',
      kind: 'software house · Marília',
      logo: { src: '/logos/gaek-icon.png', bg: '#0b0b0c', pad: 8 },
      color: '#0b0b0c',
      text: 'Cria plataformas web, apps mobile e sistemas SaaS — da tela em branco à produção em 6 a 12 semanas.',
      role: 'No LinkHub: pega oportunidades sem solução no catálogo e desenvolve junto com os lojistas.',
      url: 'https://gaek.com.br',
    },
    {
      name: 'SinalTerra',
      kind: 'agtech · ecossistema CITAP',
      logo: { src: '/logos/sinalterra-icon.png', bg: '#1f5a37', pad: 6 },
      color: '#1f5a37',
      text: 'Captura e análise de dados de campo com sensoriamento remoto e imagens de satélite para validar produtos agrícolas.',
      role: 'No LinkHub: ajuda revendas agropecuárias a mostrar ao produtor o resultado dos insumos.',
      url: 'https://sinalterra.com',
    },
    {
      name: 'Shield-ACK',
      kind: 'segurança de software',
      logo: { src: '/logos/shield-icon.png', bg: '#171717', pad: 0 },
      color: '#1f1f1f',
      text: 'Consultoria em desenvolvimento de software seguro (AppSec, DevSecOps, OWASP SAMM) e agentes de atendimento 24/7 no WhatsApp.',
      role: 'No LinkHub: atendimento automatizado para lojistas e apoio ao item de segurança e LGPD da curadoria.',
      url: 'https://www.shield-ack.com.br',
    },
  ],
}
