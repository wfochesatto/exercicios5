import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w342";

export default function FavoritesPage() {
  const { favorites, remove } = useContext(FavoritesContext);
  const list = Object.values(favorites);

  return (
    <div className="container">
      <header>
        <h1>Meus Favoritos</h1>
        <nav className="topnav">
          <Link to="/">Buscar</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>
      </header>

      {list.length === 0 ? (
        <div className="info">Você não tem favoritos ainda.</div>
      ) : (
        <section className="grid">
          {list.map((m) => (
            <div className="card" key={m.id}>
              {m.poster_path ? <img src={TMDB_IMG_BASE + m.poster_path} alt={m.title} /> : <div className="no-poster">Sem pôster</div>}
              <div className="card-body">
                <h3>{m.title}</h3>
                <div className="muted">{m.release_date?.split("-")[0] || "-"}</div>
                <div className="actions">
                  <Link to={`/movie/${m.id}`}>Ver detalhes</Link>
                  <button onClick={() => remove(m.id)}>Remover</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}