import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

function ProductList({ products, addToFavorites, isFavorite }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          addToFavorites={addToFavorites}
          isFavorite={isFavorite(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;