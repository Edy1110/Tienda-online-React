import React from 'react';
import './ProductCard.css';

function ProductCard({ product, addToFavorites, isFavorite }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <button onClick={() => addToFavorites(product)}>
        {isFavorite ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
      </button>
      <p></p>
      <button onClick={() => addTocomprar(product)}>
        {isFavorite ? 'Pagar' : 'Comprar'}
      </button>
    </article>
  );
}

export default ProductCard;