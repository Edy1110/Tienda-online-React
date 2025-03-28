import React, { useState, useEffect } from 'react';
import './Filter.css';

function Filter({ onPriceChange, onCategoryChange, products }) {
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = ['all', ...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);

  const handlePriceInputChange = (event) => {
    setPrice(event.target.value);
    onPriceChange(event.target.value);
  };

  const handleCategorySelectChange = (event) => {
    setCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  return (
    <aside className="filter">
      <h2>Filtrar</h2>
      <div className="filter-group">
        <label htmlFor="price">Precio máximo:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceInputChange}
          placeholder="$109.95"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="category">Categoría:</label>
        <select id="category" value={category} onChange={handleCategorySelectChange}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}

export default Filter;