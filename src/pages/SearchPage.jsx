import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const TMDB_API_KEY = "YOUR_TMDB_API_KEY";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const query = useQuery();
  const initialTerm = query.get("q") || "";
  const initialPage = parseInt(query.get("page") || "1", 10);

  const [term, setTerm] = useState(initialTerm);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    if (page) params.set("page", String(page));
    navigate({ pathname: "/", search: params.toString() }, { replace: true });
  }, [term, page, navigate]);

  useEffect(() => {
    if (!term) return;
    const controller = new AbortController();
    async function doSearch() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(term)}&page=${page}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const data = await res.json();
        setResults(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    doSearch();
    return () => controller.abort();
  }, [term, page]);

  function onSubmit(e) {
    e.preventDefault();
    setPage(1);
  }

  return (
    <div className="container">
      <header>
        <h1>Busca de Filmes</h1>
        <nav className="topnav">
          <Link to="/">Buscar</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>
      </header>

      <form onSubmit={onSubmit} className="search-form">
        <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Digite o nome do filme..." />
        <button type="submit">Pesquisar</button>
      </form>

      {loading && <div className="info">Carregando...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && results.length === 0 && term && <div className="info">Nenhum resultado.</div>}

      <section className="grid">
        {results.map((m) => <MovieCard key={m.id} movie={m} />)}
      </section>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}