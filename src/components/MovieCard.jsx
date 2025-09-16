import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie }) {
  const { isFav, add, remove } = useContext(FavoritesContext);
  const poster = movie.poster_path ? TMDB_IMG_BASE + movie.poster_path : null;
  const year = movie.release_date ? movie.release_date.split("-")[0] : "-";

  function toggleFav() {
    if (isFav(movie.id)) remove(movie.id);
    else add(movie);
  }

  return (
    <div className="card">
      {poster ? <img src={poster} alt={movie.title} /> : <div className="no-poster">Sem pôster</div>}
      <div className="card-body">
        <h3>{movie.title}</h3>
        <div className="muted">{year}</div>
        <div className="actions">
          <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
          <button onClick={toggleFav}>{isFav(movie.id) ? "Remover" : "Favorito"}</button>
        </div>
      </div>
    </div>
  );
}