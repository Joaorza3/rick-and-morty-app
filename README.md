# Rick and Morty Characters App

Este projeto consome a [API GraphQL da série Rick and Morty](https://rickandmortyapi.com/documentation) e implementa as seguintes interfaces:

## Desafio

- **Página de listagem dos personagens:**  
  Lista personagens da série com paginação, permite filtrar por nome e status. Ao selecionar um personagem, o usuário é direcionado para a página de detalhes.

- **Página do personagem:**  
  Exibe informações detalhadas do personagem, incluindo os episódios em que aparece.

---

## Configuração do Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

```sh
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_GRAPHQL_API_URL="https://rickandmortyapi.com/graphql"
```

> **Nota:** Você pode alterar o valor da URL se quiser apontar para outra instância da API.

### Executando em modo desenvolvimento

```sh
npm run dev
```

### Build para produção

```sh
npm run build
```

### Preview do build

```sh
npm run preview
```

### Checagem de tipos

```sh
npm run type-check
```

### Lint

```sh
npm run lint
```

---

## Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [PrimeVue](https://www.primevue.org/)
- [Apollo Client](https://apollo.vuejs.org/api/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Estrutura de Pastas

Veja a estrutura principal do projeto em [src/](src/):

- `components/` – Componentes reutilizáveis
- `views/` – Páginas principais
- `queries/` – Consultas GraphQL
- `utils/` – Utilitários
- `lib/` – Configuração do Apollo Client
