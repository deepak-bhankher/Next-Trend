import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (x) => x.product === item.product && x.size === item.size
      );
      if (exists) {
        return prev.map((x) =>
          x.product === item.product && x.size === item.size
            ? { ...x, qty: x.qty + item.qty }
            : x
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (product, size) => {
    setCartItems((prev) =>
      prev.filter((x) => !(x.product === product && x.size === size))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};