import React, { useMemo, useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  // ADDED: frontend-only cart state for demo/UI flow
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      const availableQuantity = Number(
        product.current_quantity ?? product.quantity ?? 0
      );
      const desiredQuantity = Number(quantity);

      if (availableQuantity <= 0) {
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  Number(item.quantity) + desiredQuantity,
                  availableQuantity
                ),
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: Math.min(desiredQuantity, availableQuantity),
        },
      ];
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Number(quantity) }
          : item
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
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
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