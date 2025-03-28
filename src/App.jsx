import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import Filter from './components/Filter/Filter';
import Favorites from './components/Favorites/Favorites';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(Infinity);
  const [category, setCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (e) {
        console.error('Error fetching products:', e);
        setError('Error al cargar los productos.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    if (!favorites.some(fav => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(fav => fav.id !== productId));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePriceChange = (price) => {
    setPriceRange(parseFloat(price) || Infinity);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  useEffect(() => {
    const filtered = products.filter(product => {
      const nameMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const priceMatch = product.price <= priceRange;
      const categoryMatch = category === 'all' || product.category === category;
      return nameMatch && priceMatch && categoryMatch;
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, priceRange, category]);

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} onToggleFavorites={toggleFavoritesView} showFavorites={showFavorites} />

      <main className="main-content">
        <Filter onPriceChange={handlePriceChange} onCategoryChange={handleCategoryChange} products={products} />

        {loading && <p className="loading-message">Cargando productos...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          showFavorites ? (
            <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />
          ) : (
            <ProductList products={filteredProducts} addToFavorites={addToFavorites} isFavorite={productId => favorites.some(fav => fav.id === productId)} />
          )
        )}
      </main>
    </div>
  );
}

export default App;