import { React, useState , useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductsAPI  from '../services/ProductsAPI'
import { FiHeart , FiShoppingCart } from "react-icons/fi"; // Feather: Thin, modern outline

import { useCart } from '../context/CartContext';

const FALLBACK_IMAGE_URL = "https://placehold.co/400x500?text=Desk+Lamp";

// import { MOCK_PRODUCTS } from '../mockData';

import '../styles/ProductDetailsPage.css';

import { useCart } from '../context/CartContext';
import { useToast } from '../context/useToast';


const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedQty, setSelectedQty] = useState(1);

  const { addItemToCart } = useCart();
<<<<<<< HEAD
  const { success } = useToast();

=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14

  // const [product,setProduct] = useState({})
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  
  // Find the product by ID (matching the URL param)
  // const product = MOCK_PRODUCTS.find((p) => p.id === parseInt(id));
  useEffect(()=>{
    const fetchProduct = async()=>{
      try{
        setLoading(true);
        const data = await ProductsAPI.getProductById(id);
        setProduct(data);
      }catch(error){
        console.error("Failed to load the selected product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct()
<<<<<<< HEAD
  },[id]);

=======
  }, [id])
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Loading product...</h2>
      </div>
    );
  }
<<<<<<< HEAD

=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14

  // Handle case where product isn't found
  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" className="contrast">Return to Catalog</Link>
      </div>
    );
  }

  // Generate numbers from 1 up to the total stock (max 10 for clean UI)
  const stockLimit = Math.min(product.current_quantity, 10);
  const qtyOptions = Array.from({ length: stockLimit }, (_, i) => i + 1);

  const handleAddToCart = () => {
    addItemToCart(product, Number(selectedQty));
<<<<<<< HEAD
    success(`${selectedQty} ${product.name} added to cart`);
=======
    alert(`${selectedQty} ${product.name} added to cart`);
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  };

  return (
    <main className="details-container">
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link to="/">Shop</Link></li>
          <li>{product.category}</li>
          <li>{product.name}</li>
        </ul>
      </nav>

      <div className="product-layout">
        {/* Left Side: Large Image */}
        <div className="product-image-section">
          <img
            src={product.image_url || FALLBACK_IMAGE_URL}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
        </div>

        {/* Right Side: Info & Actions */}
        <div className="product-info-section">
          <span className="brand-tag">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-price">${Number(product.price).toFixed(2)}</p>
          
          <div className="detail-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="stock-info">
            <p>{product.current_quantity > 0 ? `In Stock (${product.current_quantity} available)` : 'Out of Stock'}</p>
          </div>
          <div className="quantity-selector">
            <label htmlFor="qty">Quantity:</label>
            <select 
                id="qty" 
                value={selectedQty} 
                // onChange={(e) => setSelectedQty(e.target.value)}
<<<<<<< HEAD
                 onChange={(e) => setSelectedQty(Number(e.target.value))}
=======
                onChange={(e) => setSelectedQty(Number(e.target.value))}
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
              >
                {qtyOptions.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
          </select>
          </div>
          <div className="action-row">
<<<<<<< HEAD
            {/* <button className="add-to-cart-large"> */}
=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
            <button className="add-to-cart-large" onClick={handleAddToCart}>
                   <FiShoppingCart style={{ marginRight: '8px' }} />
                    ADD TO CART  
          </button>
            <button className="secondary outline wishlist-btn">
              <FiHeart className="wishlist-icon" />
                    WISHLIST
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;