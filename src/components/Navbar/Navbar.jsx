import React from 'react';
import './Navbar.css';

function Navbar({ onSearch, onToggleFavorites, showFavorites }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };
       
  return (
    <nav className="navbar">
        <header><h2>BAZAR24</h2></header>
      <input
        type="text"
        placeholder="Buscar productos..."
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={onToggleFavorites} className="favorites-button">
        {showFavorites ? 'Ver Productos' : 'Ver Favoritos'}
      </button>
    </nav>
  );
}

export default Navbar;