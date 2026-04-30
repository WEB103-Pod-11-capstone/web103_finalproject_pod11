import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, total, clearCart } = useCart();

<<<<<<< HEAD
  // ADDED: form state for checkout fields
=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

<<<<<<< HEAD
  // ADDED: state for success/error handling
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ADDED: if cart is empty and order is not placed, go back to cart
=======
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  if (cartItems.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" />;
  }

<<<<<<< HEAD
  // ADDED: handle form changes
=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

<<<<<<< HEAD
  // ADDED: handle checkout submit
=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zipCode.trim()
    ) {
      setErrorMessage('Please fill out all checkout fields.');
      return;
    }

    setErrorMessage('');
    clearCart();
    setOrderPlaced(true);
  };

<<<<<<< HEAD
  // ADDED: success screen after order is placed
=======
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  if (orderPlaced) {
    return (
      <main className="checkout-container">
        <section className="checkout-confirmation-card">
          <h1>Order Confirmed</h1>
          <p>Thank you for your purchase. Your order has been placed successfully.</p>
          <Link to="/" role="button">
            Return to Shop
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-container">
      <section className="checkout-header">
        <h1>Checkout</h1>
        <p>Enter your shipping details and review your order.</p>
      </section>

      <div className="checkout-layout">
        <section className="checkout-form-card">
          <h2>Shipping Information</h2>

          {errorMessage && <p className="checkout-error">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Address
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>

            <div className="checkout-row">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </label>

              <label>
                State
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Zip Code
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </label>

            <div className="checkout-actions">
              <Link to="/cart" role="button" className="secondary">
                Back to Cart
              </Link>
              <button type="submit">Confirm Purchase</button>
            </div>
          </form>
        </section>

        <aside className="checkout-summary-card">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="checkout-summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
<<<<<<< HEAD
              <span>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
=======
              <span>${(item.price * item.quantity).toFixed(2)}</span>
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
            </div>
          ))}

          <div className="checkout-summary-total">
            <span>Total</span>
<<<<<<< HEAD
            <span>${Number(total).toFixed(2)}</span>
=======
            <span>${total.toFixed(2)}</span>
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;