import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = sessionStorage.getItem("cartItem");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item) {
    setCartItems((preCart) => [...preCart, item]);
  }

  function removeFromCart(id) {
    setCartItems((preCart) =>
      preCart.filter((item) => (item.id || item._id) !== id)
    );
  }

  function emptyCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
