import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <div className="image-container">
        <img src={product.image_url} alt={product.name} />
      </div>
      
      <div className="card-body">
        <span className="category-label">{product.category}</span>
        <h5 className="product-name">{product.name}</h5>
        
        <div className="price-row">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
        
        <button className="add-to-cart-btn">ADD TO CART</button>
      </div>
    </article>
  );
};

export default ProductCard;