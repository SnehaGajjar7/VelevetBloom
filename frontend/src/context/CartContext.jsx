import { createContext, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [collections, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);


const addToCart = async (itemId, deliveryInfo) => {
  // local update logic (optional: depends on how you want to store deliveryInfo locally)
  setCartItems((prev) => {
    const updatedCart = { ...prev };
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    return updatedCart;
  });

  if (token) {
    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId, deliveryInfo },  // send deliveryInfo here
        { headers: { token } }
      );
    } catch (error) {
      console.error("Failed to add item to backend cart:", error);
      // revert local update if needed
    }
  } else {
    alert("Please login to add items to your basket.");
  }
};

  

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
 
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = collections.find(
          (product) => String(product.id) === String(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.warn("Product not found for cart item ID:", itemId);
        }
      }
    }
    return totalAmount;
  };

  const fetchFlowerList = async () => {
    const response = await axios.get(url + "/api/flower/list");

    const products = response.data.data.map((product) => ({
      ...product,
      id: product._id, // Normalize _id to id
    }));

    setCollection(products);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {}); // fallback
      console.log("Fetched collections:", collections);
      console.log("Cart items:", response.data.cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCartItems({});
    }
  };



  const addToWishlist = async (itemId) => {
    setWishlist((prev) => {
      const updatedWishlist = { ...prev };
      updatedWishlist[itemId] = (updatedWishlist[itemId] || 0) + 1;
      return updatedWishlist;
    });

    if (token) {
      await axios.post(
        url + "/api/wishlist/toggle",
        { itemId },
        { headers: { token } }
      );
    }
    console.log("wishlist", wishlist);
    toast.success(" Wishlist updated ❤️", {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
      transition: Bounce,
    });
  };

  const loadWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/wishlist", {
        withCredentials: true,
      });
  
      const data = response.data;
  
      if (data.success) {
        
        setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
        console.log("Fetched wishlist:", data.wishlist);

      } else {
        console.error("Wishlist fetch failed:", data.message);
        setWishlist([]); // fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching wishlist data: ", error);
      setWishlist([]); // fallback to empty array
    }
  };
  
  useEffect(() => {
    async function loadData() {
      await fetchFlowerList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
        await loadWishlist(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);
  
 
  
  const contextValue = {
    collections,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    addToWishlist,
    wishlist,
    setWishlist,
    loadWishlist,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
