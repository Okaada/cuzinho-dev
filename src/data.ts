export const SITE_URL = 'https://cuzinho.dev'

export const AXIOMS: [title: string, note: string][] = [
  ['O prazo é sexta 18h. O deploy é sexta 17h59.', 'Qualquer minuto antes disso é desperdício de adrenalina.'],
  ['Se compilou, tá pronto.', 'Se passou no CI, foi sorte. Não questione a sorte.'],
  ['Teste é coisa de quem tem tempo. Nós temos prazo.', 'O usuário final é a melhor suíte de testes já criada, e ainda é de graça.'],
  ['Estimativa: pense num número, divida por dois, entregue no cuzinho.', 'Story point é só a unidade de medida do desespero.'],
  ['Code review é o colega aprovando sem ler.', 'Porque ele também está no cuzinho.'],
  ['Todo hotfix é permanente.', 'O comentário // TODO: arrumar depois tem a mesma idade que o projeto.'],
  ['Se ninguém reclamou em produção, é feature.', 'Se reclamaram, é comportamento esperado.'],
  ['"Funciona na minha máquina" é ambiente de homologação.', 'Docker é só a sua máquina com mais passos.'],
  ['A sprint não termina. Ela é salva.', 'No último dia, aos 45 do segundo tempo, de preferência por um estagiário.'],
  ['Rollback é admitir derrota.', 'Nós só vamos pra frente. Às vezes caindo.'],
  ['A daily dura 15 minutos. A sua parte dura 14.', '"Ontem eu fiz várias coisas, hoje vou fazer outras, nenhum impedimento."'],
  ['Documentação é o nome da branch.', 'feature/ajuste-final-v2-agora-vai-mesmo explica tudo.'],
]

export const DICT: [raw: string, corp: string][] = [
  ['E no cuzinho não vai nada?', 'Acredito que o cumprimento das demandas exigidas extrapolaria minha disponibilidade de horário.'],
  ['Quer o cu e ainda quer raspado.', 'Os termos deste acordo já estão favoráveis a você. Não é justo exigir qualquer concessão adicional da minha parte.'],
  ['Entreguei no cuzinho.', 'A entrega foi realizada dentro do prazo acordado, com margem de segurança otimizada.'],
  ['Tomei no cu nessa sprint.', 'Enfrentamos alguns desafios inesperados que impactaram a velocidade do time neste ciclo.'],
  ['Vai tomar no cu, isso não é bug.', 'Conforme a especificação, este é o comportamento esperado do sistema.'],
  ['Fiz nas coxas.', 'Optamos por uma abordagem enxuta para validar a hipótese rapidamente.'],
  ['Que porra é essa nesse código?', 'Você poderia me contextualizar sobre as decisões técnicas por trás desta implementação?'],
  ['Isso aqui tá uma merda.', 'Identifiquei algumas oportunidades de melhoria relevantes.'],
  ['Não fui eu.', 'Vou analisar o histórico de commits para entender a origem do problema.'],
  ['Foda-se, sobe assim.', 'Seguiremos com o deploy e monitoraremos ativamente os indicadores.'],
  ['Me fodi no deploy.', 'O deploy apresentou instabilidades pontuais e já estamos atuando na mitigação.'],
  ['O cliente pediu mais uma alteração no cuzinho do prazo.', 'Recebemos uma solicitação de mudança de escopo próxima à data de entrega e estamos avaliando o impacto.'],
]

export const BADGE_MD = `[![deploy: no cuzinho](https://img.shields.io/badge/deploy-no%20cuzinho-d6331f)](${SITE_URL})`

export const REPO_URL = 'https://github.com/eduumach/cuzinho-dev'

export type ExcuseTag = 'daily' | 'prod' | 'prazo'

export const EXCUSE_TAGS: { id: ExcuseTag; label: string }[] = [
  { id: 'daily', label: 'Pra daily' },
  { id: 'prod', label: 'Pra quando caiu produção' },
  { id: 'prazo', label: 'Pra quando estourou o prazo' },
]

export const EXCUSES: [text: string, tag: ExcuseTag][] = [
  ['O ambiente de homologação caiu e levou minha produtividade junto.', 'daily'],
  ['Tava esperando o PO responder. Ele tá de férias desde março.', 'prazo'],
  ['Funciona na minha máquina. O problema é a máquina de vocês.', 'prod'],
  ['A task era maior do que parecia quando eu estimei em 1 ponto.', 'prazo'],
  ['O npm install ainda não terminou.', 'daily'],
  ['Atualizei uma dependência e agora preciso reescrever o projeto.', 'prazo'],
  ['O Copilot sugeriu e eu confiei.', 'prod'],
  ['Era só um ajuste no CSS. Três dias depois, cá estamos.', 'prazo'],
  ['Tô bloqueado esperando um acesso que pedi há duas sprints.', 'daily'],
  ['O bug só acontece em produção, então tô esperando acontecer de novo.', 'prod'],
  ['Fiz o merge e o Git decidiu que meu código não existia.', 'daily'],
  ['A reunião de alinhamento desalinhou tudo.', 'prazo'],
  ['Refatorei pra ficar mais fácil de entender. Agora ninguém entende.', 'daily'],
  ['Não é bug, é race condition. Às vezes ganha, às vezes perde.', 'prod'],
  ['O cache. Sempre é o cache.', 'prod'],
  ['É DNS. Sempre é DNS.', 'prod'],
  ['Passou local, falhou no CI, passou quando rodei de novo. Tá ótimo.', 'daily'],
  ['A especificação mudou. Na verdade nunca existiu, mas mudou.', 'prazo'],
  ['Fiquei preso numa daily que durou o dia todo.', 'daily'],
  ['O Docker comeu o disco inteiro e minha vontade de viver.', 'daily'],
  ['Tô investigando. (Abri a issue e fui tomar café.)', 'prod'],
  ['Era fuso horário. Sempre que tem data no meio, é fuso horário.', 'prod'],
  ['O estagiário mergeou na main. O estagiário era eu.', 'prod'],
  ['Ia subir na quinta, mas esperei a sexta, como manda a metodologia.', 'prazo'],
]

export const COMMITS = [
  'fix: agora vai',
  'fix: agora vai mesmo',
  'fix: agora vai mesmo de verdade',
  'fix: ajuste final',
  'fix: ajuste final v2',
  'chore: não mexe',
  'feat: coisa que o cliente pediu ontem às 23h',
  'refactor: renomeia x pra x2',
  'hotfix: sexta 17:58',
  'wip: termino segunda (não termino)',
  'fix: arruma o fix anterior',
  'revert: revert do revert',
  'fix: funciona na minha máquina',
  'chore: remove console.log (deixei uns três)',
  'fix: typo (era o banco inteiro)',
  'feat: adiciona feature que ninguém pediu',
  'fix: comportamento esperado',
  'chore: atualiza dependências e reza',
  'fix: ???',
  'fix: pqp',
  'docs: documentação é o nome da branch',
  'test: comenta o teste que tava quebrando',
  'perf: remove o sleep(3000) que eu mesmo coloquei',
  'style: prettier no projeto inteiro, boa sorte no review',
]

export const BINGO_FREE = '17:59 de sexta'

export const BINGO = [
  'Dá pra ver isso rapidinho?',
  'Isso é simples, né?',
  'Tá funcionando em prod?',
  'Quem mexeu na main?',
  'Podia ser um e-mail',
  'Você tá no mudo',
  'Vamos alinhar depois',
  'Só um minutinho',
  'Na minha máquina funciona',
  'Foi o cache',
  'O cliente mudou de ideia',
  'Vou subir rapidinho',
  'Quem aprovou esse PR?',
  'Ninguém escreveu teste',
  'Joga no backlog',
  'Não tava no escopo',
  'Quebrou o build',
  'Cadê o estagiário?',
  'Isso é 1 ponto',
  'Faz rollback!',
  'Hotfix do hotfix',
  'Compartilha a tela?',
  'Vou abrir um card',
  'Daily de 1 hora',
  'Era DNS',
  'Erro 500',
  'Bom dia, pessoal (14h)',
  'Ah, mas é só um if',
]
