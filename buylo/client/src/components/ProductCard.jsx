import React from 'react';
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi"; 

import { useCart } from '../context/CartContext';
<<<<<<< HEAD
import { useToast } from '../context/useToast';
=======

const FALLBACK_IMAGE_URL = "https://placehold.co/400x500?text=Desk+Lamp";
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14

const ProductCard = ({ product }) => {

  const { addItemToCart } = useCart();
<<<<<<< HEAD
  const { success } = useToast();
=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14

  const handleAddToCart = (e) => {
    // This is CRITICAL: It stops the Link from navigating 
    // to the details page when you just want to add to cart.
    e.preventDefault();
    e.stopPropagation();

    addItemToCart(product, 1);
<<<<<<< HEAD
    success(`${product.name} added to cart`);

=======

    alert(`${product.name} added to cart`);

    
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
    console.log("Added to cart:", product.name);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
    <article className="product-card">
      <div className="image-container">
        <img
          src={product.image_url || FALLBACK_IMAGE_URL}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE_URL;
          }}
        />
      </div>
      
      <div className="card-body">
        <span className="category-label">{product.category}</span>
        <h5 className="product-name">{product.name}</h5>
        
        <div className="price-row">
          <span className="price">${Number(product.price).toFixed(2)}</span>
        </div>
        
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <FiShoppingCart style={{ marginRight: '8px' }} /> ADD TO CART
        </button>
      </div>
    </article>
    </Link>
  );
};

export default ProductCard;