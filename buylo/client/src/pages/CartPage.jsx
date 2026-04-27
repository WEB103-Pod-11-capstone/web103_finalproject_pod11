import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const {
    cartItems,
    updateItemQuantity,
    removeItemFromCart,
    total,
  } = useCart();

  return (
    <main className="cart-container">
      <section className="cart-header">
        <h1>Your Cart</h1>
        <p>Review your selected items before checkout.</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a few products from the catalog to continue.</p>
          <Link to="/" role="button">
            Continue Shopping
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items-section">
            {cartItems.map((item) => {
              const maxQty = Math.min(item.current_quantity ?? item.quantity ?? 10, 10);

              return (
                <article key={item.id} className="cart-item-card">
                  <div className="cart-item-image">
                    <img src={item.image_url} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <span className="cart-item-category">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>

                    {/* CHANGED: convert item.price to Number before using toFixed */}
                    <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                  </div>

                  <div className="cart-item-actions">
                    <label htmlFor={`qty-${item.id}`}>Qty</label>
                    <select
                      id={`qty-${item.id}`}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemQuantity(item.id, e.target.value)
                      }
                    >
                      {Array.from({ length: maxQty }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>

                    {/* CHANGED: convert price and quantity to numbers before multiplying */}
                    <p className="cart-item-subtotal">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>

                    <button
                      className="secondary outline"
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="cart-summary-card">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="cart-summary-row">
              <span>Total</span>
              {/* CHANGED: make total safe too */}
              <span>${Number(total).toFixed(2)}</span>
            </div>

            <div className="cart-summary-actions">
              <Link to="/" role="button" className="secondary">
                Continue Shopping
              </Link>
              <Link to="/checkout" role="button">
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;