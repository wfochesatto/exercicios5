import React, { useState, useEffect } from "react";

export const FavoritesContext = React.createContext({
  favorites: {},
  add: () => {},
  remove: () => {},
  isFav: () => false,
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("tmdb_favorites_v1");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("tmdb_favorites_v1", JSON.stringify(favorites));
  }, [favorites]);

  const add = (movie) => setFavorites((f) => ({ ...f, [movie.id]: movie }));
  const remove = (id) => setFavorites((f) => {
    const copy = { ...f };
    delete copy[id];
    return copy;
  });
  const isFav = (id) => !!favorites[id];

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}