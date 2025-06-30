import React, { createContext, useContext, useState } from "react";

// Define and export CartContext here
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = React.useCallback((product) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((item) => item.name === product.name);
      if (idx !== -1) {
        // Already in cart, just increase quantity
        const updated = [...prevCart];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        return updated;
      }
      // Add new product with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    return true;
  }, []);

  function removeFromCart(name) {
    setCart(prev => prev.filter(item => item.name !== name));
  }

  function clearCart() {
    setCart([]);
  }

  const value = React.useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    // ...other context values...
  }), [cart, addToCart, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Export useCart hook for convenience
export function useCart() {
  return useContext(CartContext);
}
