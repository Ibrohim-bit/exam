import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { FaHeart, FaRegHeart, FaSearch, FaFilter, FaSort } from "react-icons/fa";
import "./Products.css";

function Products({ addToCart, cart, productLikes, toggleLike }) {
  const [quantities, setQuantities] = useState({});
  const [showSelectors, setShowSelectors] = useState({});

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    return cats;
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseFloat(priceRange.max));
      const matchesRating = !minRating || product.rating >= parseFloat(minRating);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'stock':
          aValue = a.stock;
          bValue = b.stock;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, minRating, sortBy, sortOrder]);

  const getCurrentQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const key = productId.toString();
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, newQuantity),
    }));
    if (newQuantity === 0) {
      setShowSelectors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleAddToCart = (product) => {
    const key = product.id.toString();
    const qty = quantities[key] || 0;
    if (qty === 0) {
      setShowSelectors((prev) => ({ ...prev, [key]: true }));
      setQuantities((prev) => ({ ...prev, [key]: 1 }));
      return;
    }
    const currentInCart = getCurrentQuantity(product.id);
    if (currentInCart + qty > product.stock) {
      alert("Not enough stock available");
      return;
    }
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setQuantities((prev) => ({ ...prev, [key]: 0 }));
    setShowSelectors((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="products-page">
      <h1>Computer Products</h1>

      {/* Search and Filter Controls */}
      <div className="controls-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-buttons">
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>

          <div className="sort-controls">
            <FaSort />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="stock">Stock</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range:</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min price"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max price"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Minimum Rating:</label>
            <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="3.0">3.0+ Stars</option>
            </select>
          </div>

          <button
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setPriceRange({ min: '', max: '' });
              setMinRating('');
              setSortBy('name');
              setSortOrder('asc');
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      <div className="results-info">
        <p>Showing {filteredProducts.length} of {products.length} products</p>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="like-icon" onClick={() => toggleLike(product.id)}>
              {productLikes[product.id] ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
            </div>
            <Link className="dawd" to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            {showSelectors[product.id.toString()] && (
              <div className="quantity-selector">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      (quantities[product.id.toString()] || 0) - 1
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max={product.stock - getCurrentQuantity(product.id)}
                  value={quantities[product.id.toString()] || 0}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.id,
                      parseInt(e.target.value) || 0
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      (quantities[product.id.toString()] || 0) + 1
                    )
                  }
                  disabled={(quantities[product.id.toString()] || 0) >= product.stock - getCurrentQuantity(product.id)}
                >
                  +
                </button>
              </div>
            )}

            <button
              onClick={() => handleAddToCart(product)}
              disabled={
                getCurrentQuantity(product.id) + (quantities[product.id.toString()] || 0) >
                  product.stock
              }
            >
              Add 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
