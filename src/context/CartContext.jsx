import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // ye line add ki
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    if (user?.isAdmin) {
      toast.error("Admins can't add items to cart");
      return false; // failure
    }
    setCartItems((prev) => {
      const exists = prev.find(
        (x) => x.product === item.product && x.size === item.size,
      );
      if (exists) {
        return prev.map((x) =>
          x.product === item.product && x.size === item.size
            ? { ...x, qty: x.qty + item.qty }
            : x,
        );
      }
      return [...prev, item];
    });
    return true; // success
  };

  const removeFromCart = (product, size) => {
    setCartItems((prev) =>
      prev.filter((x) => !(x.product === product && x.size === size)),
    );
  };

  const updateQty = (product, size, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((x) =>
        x.product === product && x.size === size ? { ...x, qty: newQty } : x,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
