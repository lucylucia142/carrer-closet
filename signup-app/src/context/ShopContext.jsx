import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "R";
  const delivery_fee = 10;

  // State
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ------------------- Products -------------------
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      // 🔹 Normalize each product → ensure arrays for images/sizes
      const normalized = data.map((product) => {
        const normalizedImage = Array.isArray(product.image)
          ? product.image
          : [product.image].filter(Boolean);

        const normalizedSizes =
          Array.isArray(product.sizes) && product.sizes.length > 0
            ? product.sizes
            : ["S", "M", "L", "XL"];

        return {
          ...product,
          image: normalizedImage,
          sizes: normalizedSizes,
        };
      });

      setProducts(normalized);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Auth -------------------
  const initAuth = async () => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        const { userId } = JSON.parse(auth);
        if (!userId) throw new Error("Invalid auth data");
        const res = await fetch(`http://localhost:3000/user/${userId}`, {
          headers: { Authorization: `Bearer ${userId}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const userData = await res.json();
        setUser({
          _id: userData.userId,
          userName: userData.userName,
          email: userData.email,
          avatar: userData.avatar,
          phone: userData.phone,
          address: userData.address,
          settings: userData.settings,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        setUser(null);
        setCartItems({});
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setCartItems({});
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser(null);
    setCartItems({});
  };

  // ------------------- Cart -------------------
  const loadCart = async (userId) => {
    if (!userId) return;
    try {
      setCartLoading(true);
      setCartError("");
      const res = await fetch(`http://localhost:3000/cart/${userId}`, {
        headers: { Authorization: `Bearer ${userId}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCartItems(data.items || {});
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartError("Failed to load cart. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (itemId, size = "M") => {
    const newCart = structuredClone(cartItems);
    if (!newCart[itemId]) newCart[itemId] = {};
    newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;

    if (JSON.stringify(cartItems) === JSON.stringify(newCart)) return;

    setCartItems(newCart);
    if (isAuthenticated && user?._id) {
      try {
        const res = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user._id}`,
          },
          body: JSON.stringify({
            userId: user._id,
            itemId,
            size,
            quantity: newCart[itemId][size],
          }),
        });
        if (!res.ok) throw new Error("Failed to add to cart");
      } catch (error) {
        console.error("Failed to save cart to MongoDB:", error);
        setCartError("Failed to update cart. Please try again.");
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const newCart = structuredClone(cartItems);
    if (!newCart[itemId]) return;

    if (quantity <= 0) {
      delete newCart[itemId][size];
      if (Object.keys(newCart[itemId]).length === 0) delete newCart[itemId];
    } else {
      newCart[itemId][size] = quantity;
    }

    if (JSON.stringify(cartItems) === JSON.stringify(newCart)) return;

    setCartItems(newCart);
    if (isAuthenticated && user?._id) {
      try {
        if (quantity <= 0) {
          const res = await fetch(
            `http://localhost:3000/cart/${user._id}/${itemId}/${size}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${user._id}` },
            }
          );
          if (!res.ok) throw new Error("Failed to remove from cart");
        } else {
          const res = await fetch(`http://localhost:3000/cart/${user._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user._id}`,
            },
            body: JSON.stringify({ itemId, size, quantity }),
          });
          if (!res.ok) throw new Error("Failed to update cart");
        }
      } catch (error) {
        console.error("Failed to update cart in MongoDB:", error);
        setCartError("Failed to update cart. Please try again.");
      }
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        for (const size in cartItems[itemId]) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  // ------------------- Lifecycle -------------------
  useEffect(() => {
    initAuth();
    loadProducts();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      loadCart(user._id);
    } else {
      setCartItems({});
    }
  }, [isAuthenticated, user]);

  // ------------------- Context Value -------------------
  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    getCartCount,
    loading,
    cartLoading,
    cartError,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    loadProducts,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
