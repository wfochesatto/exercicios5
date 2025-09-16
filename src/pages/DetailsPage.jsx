import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFav, add, remove } = useContext(FavoritesContext);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR&append_to_response=credits`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const data = await res.json();
        setMovie(data);
        setCredits(data.credits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="info">Carregando detalhes...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return null;

  const director = credits?.crew?.find((p) => p.job === "Director")?.name || "-";
  const cast = credits?.cast?.slice(0, 8) || [];

  function toggleFav() {
    if (isFav(movie.id)) remove(movie.id);
    else add(movie);
  }

  return (
    <div className="container">
      <header>
        <h1>{movie.title}</h1>
        <nav className="topnav">
          <Link to="/">Buscar</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>
      </header>

      <div className="details">
        {movie.poster_path ? (
          <img src={TMDB_IMG_BASE + movie.poster_path} alt={movie.title} />
        ) : (
          <div className="no-poster">Sem pôster</div>
        )}

        <div className="meta">
          <p><strong>Ano:</strong> {movie.release_date?.split("-")[0] || "-"}</p>
          <p><strong>Diretor:</strong> {director}</p>
          <p><strong>Avaliação:</strong> {movie.vote_average} ({movie.vote_count} votos)</p>
          <p><strong>Sinopse:</strong> {movie.overview || "-"}</p>
          <p><strong>Elenco:</strong></p>
          <ul className="cast">
            {cast.map((c) => (
              <li key={c.cast_id || c.id}>{c.name} como {c.character}</li>
            ))}
          </ul>
          <button onClick={toggleFav}>{isFav(movie.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}</button>
        </div>
      </div>
    </div>
  );
}