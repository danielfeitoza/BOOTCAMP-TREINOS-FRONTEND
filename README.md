# Fit.ai Frontend

Aplicacao web do projeto Fit.ai, desenvolvida durante o Bootcamp da Full Stack Club. Este repositorio concentra a experiencia web do produto: autenticacao, onboarding, visualizacao dos treinos, acompanhamento de consistencia, perfil do usuario e integracao com smartwatch.

## Objetivo do projeto

O objetivo deste projeto foi construir um MVP funcional para acompanhamento de treinos, explorando um fluxo mais completo do que um CRUD tradicional. A ideia foi conectar a experiencia web com uma API propria e com um dispositivo vestivel, permitindo que o usuario acompanhe sua rotina de treino e tambem vincule um smartwatch para iniciar e finalizar sessoes.

Durante o bootcamp, o foco foi:

- praticar desenvolvimento full stack com uma aplicacao real
- aprofundar o uso de Next.js, React e Node.js em um fluxo de produto
- integrar autenticacao, onboarding, consumo de API e deploy
- validar o uso de IA como ferramenta de apoio ao desenvolvimento
- entregar um MVP funcional, sabendo que ainda existem varios pontos de evolucao

## O que a aplicacao faz

Principais funcionalidades do frontend:

- autenticacao de usuario com better-auth
- onboarding inicial para coleta de informacoes do usuario
- exibicao do treino do dia
- visualizacao de consistencia e sequencia de treinos
- navegacao pelos planos de treino e detalhes de cada dia
- inicio e finalizacao de sessoes de treino
- pagina de perfil com metricas do usuario
- vinculacao e desvinculacao de smartwatch
- tutorial de vinculacao do dispositivo diretamente na interface

## Integracao com smartwatch

Um dos pontos principais deste MVP foi a tentativa de implementar algo menos comum em projetos de estudo: o vinculo com um dispositivo vestivel.

Fluxo implementado:

- o smartwatch gera um QR Code
- o usuario escaneia esse codigo com o celular
- ao abrir o link, o dispositivo e vinculado ao usuario autenticado
- no perfil, o usuario consegue visualizar o dispositivo vinculado
- caso queira, tambem pode desvincular o smartwatch

Esse fluxo foi pensado para aproximar o projeto de um caso real de produto, mesmo sendo um MVP.

## Tecnologias utilizadas

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

### Autenticacao e integracao

- better-auth
- consumo de API REST
- Orval para geracao do client da API

### UI e utilitarios

- lucide-react
- class-variance-authority
- clsx
- tailwind-merge
- radix-ui
- dayjs
- nuqs

## Estrutura geral

O projeto utiliza App Router do Next.js e organiza a aplicacao por rotas e componentes. A comunicacao com a API fica centralizada em `app/_lib/api/fetch-generated` e em utilitarios internos de fetch/autenticacao.

Algumas areas importantes:

- `app/` contem as paginas e rotas da aplicacao
- `app/_lib/` concentra helpers, auth, datas e integracao com a API
- `components/` contem componentes reutilizaveis de interface
- `app/profile/` concentra a area de perfil, incluindo o fluxo de smartwatch

## Variaveis de ambiente

Para rodar o projeto localmente, configure um arquivo `.env` com pelo menos estas variaveis:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
NEXT_PUBLIC_BASE_URL=http://localhost:3000
APP_TIMEZONE=America/Sao_Paulo
```

## Como executar localmente

Instale as dependencias:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicacao ficara disponivel em:

```bash
http://localhost:3000
```

Para gerar build de producao:

```bash
npm run build
npm run start
```

## Qualidade de codigo

Para verificar lint:

```bash
npm run lint
```

## Repositorios relacionados

Este frontend faz parte de um ecossistema maior do projeto Fit.ai:

- API: `https://github.com/danielfeitoza/BOOTCAMP-TREINOS-API`
- Smartwatch: `https://github.com/danielfeitoza/fit-ai-watch`

## Estado atual

Este projeto representa um MVP funcional. Ele atende os principais fluxos que foram propostos durante o bootcamp, mas ainda possui espaco para varias melhorias, como:

- refinamento de experiencia do usuario
- tratamento mais completo de erros e estados de carregamento
- cobertura de testes
- melhorias de acessibilidade
- evolucao do fluxo entre app web, API e smartwatch

Mesmo assim, o resultado final superou a expectativa inicial do projeto e serviu como uma experiencia pratica importante para consolidar conceitos de frontend, integracao e produto.

## Autor

Desenvolvido por Daniel Feitoza durante o Bootcamp da Full Stack Club.
