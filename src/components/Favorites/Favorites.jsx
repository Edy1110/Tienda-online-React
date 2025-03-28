import React from 'react';
import './Favorites.css';
import ProductCard from '../ProductCard/ProductCard';

function Favorites({ favorites, removeFromFavorites }) {
  if (favorites.length === 0) {
    return <p>No has añadido ningún producto a favoritos.</p>;
  }

  return (
    <div className="favorites">
      <h2>Productos Favoritos</h2>
      <div className="product-list">
        {favorites.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToFavorites={() => removeFromFavorites(product.id)}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;