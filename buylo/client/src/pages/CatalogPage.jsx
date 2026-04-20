import React from 'react';
import { MOCK_PRODUCTS } from '../mockData';
import '../styles/CatalogPage.css';
import { useState, useMemo } from 'react';  

import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';

const CatalogPage = ({ searchTerm }) => {
  const [sortBy, setSortBy] = useState('score');


  // adding state for category filter
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...new Set(MOCK_PRODUCTS.map((product) => product.category))];

  // const sortedProducts = useMemo(() => {
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (searchTerm.trim() !== '') {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory);
    }


    switch (sortBy) {
      case 'title': return result.sort((a, b) => a.name.localeCompare(b.name));
      case '-title': return result.sort((a, b) => b.name.localeCompare(a.name));
      case 'price': return result.sort((a, b) => a.price - b.price);
      case '-price': return result.sort((a, b) => b.price - a.price);
      default: return result;
    }
  // }, [sortBy]);
  }, [sortBy, searchTerm, selectedCategory]);


  return (
    <main className="catalog-container">
      

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>CURATED ESSENTIALS FOR FOCUSED LIVING</h1>
          <p>Minimalist tools, accessories, and apparel for the modern mind.</p>
        </div>
        <div className="hero-icon">
          {/* Placeholder for that image icon in your wireframe */}
          {/* <span className="icon-placeholder">🖼️</span> */}
        </div>
      </section>


    


      {/* Filter Row */}
      <Filter 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      
      <div className="product-grid">
        {/* {sortedProducts.map((product) => ( */}
        {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>     
    
    </main>
  );
};

export default CatalogPage;