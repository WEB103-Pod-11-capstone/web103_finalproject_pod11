import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
<<<<<<< HEAD
  // ADDED: frontend-only cart state for demo/UI flow
=======
  // NEW: session-only cart state for frontend UI flow
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      const availableQuantity =
        product.current_quantity ?? product.quantity ?? 0;

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
<<<<<<< HEAD
                quantity: Math.min(
                  Number(item.quantity) + Number(quantity),
                  availableQuantity
                ),
=======
                quantity: Math.min(item.quantity + quantity, availableQuantity),
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
<<<<<<< HEAD
          quantity: Math.min(Number(quantity), availableQuantity || 1),
=======
          quantity: Math.min(quantity, availableQuantity || 1),
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
        },
      ];
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
<<<<<<< HEAD
        item.id === productId
          ? { ...item, quantity: Number(quantity) }
          : item
=======
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
      )
    );
  };

  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = useMemo(() => {
    return cartItems.reduce(
<<<<<<< HEAD
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
=======
      (sum, item) => sum + item.price * item.quantity,
>>>>>>> 9f64f4fe711198f2254ec86276d8d24fb8451c14
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);