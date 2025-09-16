# TMDB React App

Aplicação em **React** que consome a [API do TMDB](https://www.themoviedb.org/documentation/api) para permitir que usuários busquem filmes, vejam detalhes e montem uma lista de favoritos.

## Funcionalidades

- Busca de Filmes: Campo de pesquisa e listagem de resultados com pôster, título e ano.  
- Paginação: Navegação entre páginas de resultados.  
- Detalhes do Filme: Exibe diretor, elenco, sinopse e avaliação.  
- Lista de Favoritos: Adicionar/remover filmes, persistidos no `localStorage`.  
- Loading & Erros: Indicadores de carregamento e mensagens de erro.  

## Tecnologias

- [React](https://react.dev/)  
- [React Router](https://reactrouter.com/)  
- [TMDB API](https://developer.themoviedb.org/)  
- LocalStorage  

## Como Utilizar

1. Criar um projeto React

Você pode criar um projeto com **Vite** ou **Create React App**.  
Exemplo com Vite:

npm create vite@latest tmdb-react-app
cd tmdb-react-app
npm install

2. Substituir a pasta src

Apague a pasta src que veio com o projeto e substitua pela pasta src deste repositório.

3. Configurar a chave da API

Crie sua chave da TMDB API em TMDB
.
Depois, no arquivo src/services/api.js, substitua:
const API_KEY = "YOUR_TMDB_API_KEY";

4. Instalar dependências adicionais

Instale o React Router (se não estiver no seu projeto):
npm install react-router-dom

5. Rodar o projeto
npm run dev
