<h1 align="center">
    <img alt="NeuralMed" title="NeuralMed" src=".github/logo.svg" width="300px" />
</h1>

<p align="center">
  <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#testes">Testes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#estrutura-do-projeto">Estrutura do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://daineze-neuralmed-code-challenge.netlify.app/">Demo</a>&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
  <img 
    alt="GitHub top language" 
    src="https://img.shields.io/github/languages/top/fdaineze/neuralmed-code-challenge"
  >
  <img 
    alt="GitHub language count" 
    src="https://img.shields.io/github/languages/count/fdaineze/neuralmed-code-challenge"
  >
  <img 
    alt="Repo size" 
    src="https://img.shields.io/github/repo-size/fdaineze/neuralmed-code-challenge"
  >
  <a href="https://github.com/fdaineze/neuralmed-code-challenge/commits/master">
    <img 
      alt="GitHub last commit" 
      src="https://img.shields.io/github/last-commit/fdaineze/neuralmed-code-challenge"
    >
  </a>
  <img src="https://img.shields.io/badge/version-1.0.0-red" alt="shield" />
  <a href="https://app.netlify.com/sites/daineze-neuralmed-code-challenge/deploys">
    <img 
      alt="Deploy Status" 
      src="https://api.netlify.com/api/v1/badges/6d3b65b5-49d6-4de1-8d97-bb3108abb55d/deploy-status"
    >
  </a>
</p>

# Projeto
Este projeto é uma aplicação Next.js que lista e detalha personagens de quadrinhos da Marvel, utilizando a API da Marvel. A aplicação permite buscar personagens, visualizar detalhes, e exibir histórias em quadrinhos, eventos e séries relacionadas.

> OBS: A api apresenta bastante lentidão, conforme é possível notar na [Página de teste de API Interativa](https://developer.marvel.com/docs)

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

### Front-end
- [ReactJS](https://github.com/facebook/react)
- [NextJS 14](https://github.com/vercel/next.js)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- [PostCSS](https://github.com/postcss/postcss)
- [ESLint](https://github.com/eslint/eslint)
- [Vitest](https://github.com/vitest-dev/vitest) (Teste Unitário)
- [Playwright](https://github.com/microsoft/playwright) (Teste E2E)

## Pré-requisitos
Antes de começar, você precisará ter o Node.js e o npm (ou yarn) instalados em seu ambiente. Você pode baixar o Node.js [aqui](https://nodejs.org/en).

Recomendado o uso de NVM para garantir que o projeto está rodando na mesma versão Node, [você pode baixar aqui](https://github.com/coreybutler/nvm-windows#readme).

Crie um arquivo .env e siga o modelo do arquivo .env.exemple. Para obter seus chaves da api, basta se cadastrar no site [Marvel Api](https://developer.marvel.com/) e logo após ir até a página [Conta](https://developer.marvel.com/account).

## Como Executar

1. Clone o Repositório

```bash
git clone https://github.com/FDaineze/neuralmed-code-challenge
cd neuralmed-code-challenge
```

2. Instale as Dependências

```bash
# Com o npm:
npm install
# Ou com o yarn:
yarn install
```

3. Configuração do Arquivo .env

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
# Consulte suas keys em: https://developer.marvel.com/account
# Sua chave pública
API_KEY=
# Sua chave privada
PRIVATE_KEY=
```

4. Rodar a Aplicação

Para iniciar o servidor de desenvolvimento, execute:

```bash
# Com o npm:
npm run dev
# Ou com o yarn:
yarn dev
```

A aplicação estará disponível em http://localhost:3000.

## Testes

Para garantir que está na mesma versão, use:

```bash
nvm use
# Ou
nvm use $(cat .nvmrc)
```

Para rodar os testes unitários, use:

```bash
# Com o npm:
npm run test
# Ou com o yarn:
yarn test
```

Para rodar os testes E2E, use:

```bash
# Primeiro execute o servidor local
npm run dev
# Em outro terminal, rode o teste
npm run test:e2e
```

## Estrutura do Projeto
```
marvel-app
│
├── public/                     # Arquivos estáticos (imagens, ícones, etc.)
│
├── src/
│   ├── __tests_e2e__/          # Arquivos de testes End to End (playwright)
│   │
│   ├── __tests_unit__/         # Arquivos de testes Unitários (vitest)
│   │
│   ├── pages/                  # Páginas do Next.js
│   │   ├── _app.tsx            # Página de montagem do APP
│   │   ├── 404.tsx             # Página para arquivos não encontrados (como id de char inválido)
│   │   ├── index.tsx           # Página inicial (Listagem de Personagens)
│   │   └── details/            
│   │       └── [id].tsx        # Página de detalhes do personagem
│   │
│   ├── api/                    # Lógica para chamadas à API
│   │   └── marvel.ts           # Configuração e funções de chamada à API da Marvel
│   │
│   ├── components/             # Componentes React reutilizáveis
│   │   ├── CatalogList.tsx     # Componente de exibição catálogos (Séries, Eventos, Quadrinhos)
│   │   ├── CharacterCard.tsx   # Componente de exibição de personagem
│   │   ├── Header.tsx          # Componente de cabeçalho
│   │   ├── LoadingScreen.tsx   # Componente de loading global
│   │   ├── Pagination.tsx      # Componente de paginação
│   │   └── SearchInput.tsx     # Componente de input de busca
│   │
│   ├── layout/                 # Componentes React reutilizáveis
│   │   └── Application.tsx     # Layout base da aplicação (header + Página atual)
│   │
│   ├── styles/                 # Estilos globais e específicos
│   │   └── globals.css         # Estilos globais do Tailwind CSS
│   │
│   ├── types/                  # Tipos TypeScript
│   │   ├── api.d.ts            # Definições de tipos para a API da Marvel
│   │   └── marvel.d.ts         # Definições de tipos para a RETORNOS da API da Marvel
│   │
│   └── utils/                  # Utilitários e funções auxiliares
│       └── hash.ts             # Função para gerar hash MD5
│
├── .env.example                # Arquivo exemplo de configuração para variáveis de  (.env)
├── .gitignore                  # Arquivo para ignorar arquivos do Git
├── next.config.js              # Configuração do Next.js
├── package.json                # Dependências e scripts do projeto
├── playwright.config.ts        # Configuração do Playwright
├── postcss.config.mjs          # Configuração do PostCSS
├── tailwind.config.js          # Configuração do Tailwind CSS
├── tsconfig.json               # Configuração do TypeScript
├── vitest.config.ts            # Configuração do Vitest
└── README.md                   # Documentação do projeto
```

## Contato
Filipe Daineze - [@filipe.daineze](https://www.linkedin.com/in/filipe-daineze/)

# Sobre o Teste:

## Neuralmed Code Challenge

Objetivo: Desenvolver uma aplicação de listagem e detalhe de personagens de quadrinho de acordo com o design fornecido.

## Requisitos:

- ✅ NextJS 14
- ✅ Typescript
- ✅ Tailwind
- ✅ API da Marvel (Documentação)
- ⚠️ Disponibilizar a aplicação em uma URL pública para avaliação
- ✅ Disponibilizar o código em um repositório público no Github
- ✅ Seguir layout do design
- ✅ Testes unitários usando vitest e react testing library
- ✅ Configurar ferramentas para garantir a qualidade do código (ESLINT*, prettier, husky, lint-staged)
- ✅ Não utilizar bibliotecas de UI como bootstrap, semantic-ui, antdesign, etc.

## Requisitos Funcionais:

### Página de Listagem de Personagens (Home):

- ✅ Exibir os 10 primeiros resultados da API
- ✅ Permitir filtrar por nome, pelo campo de busca
- ✅ Paginação

### Página de Detalhe do Personagem:

- ✅ Exibir dados do personagem
- ✅ Exibir lista de histórias em quadrinhos do personagem
- ✅ Exibir lista de eventos do personagem
- ✅ Exibir lista de séries do personagem

## Bônus (Não Obrigatório):

- ✅ Layout responsivo
- ✅ Testes E2E com playwright ou cypress

## Dicas:

- ✅ Valorizamos muito testes em nosso processo de desenvolvimento
- ✅ Faça um README claro e intuitivo para auxiliar na inicialização do projeto
- ✅ Utilize boas práticas de programação
- ✅ Utilize boas práticas de organização de código

## Pendências:
- Verificar possibilidade de trocar \<img> para \<Image> sem que o design quebre
- Realizar upload publico (netlify ou vercel)
- Verificar porque netlify retorna 404