import React, { createContext } from 'react';
import { useContext } from 'react';
import { authDataContext } from './authContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { userDataContext } from './UserContext';
import { toast } from 'react-toastify';

export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [loading,setLoading]=useState(false)

  const [products, setProducts] = useState([])
  let [search, setSearch] = useState('')
  let [showSearch, setShowSearch] = useState(false)


  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)

  const [cartItem, setCartItem] = useState({});
  let currency = '₨'
  let delivery_fee = 100

  async function getProducts() {
    try {
      const result = await axios.get(serverUrl + "/api/product/list", { withCredentials: true });
      console.log(result.data);
      setProducts(result.data)
    } catch (error) {
      setProducts([])
      console.log(error)
    }
  }

  const addToCart = async (itemId, size) => {
    setLoading(true)
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (userData) {
      try {
        const result = await axios.post(serverUrl + "/api/cart/add", { itemId, size },
          { withCredentials: true })
        console.log(result.data)
        setLoading(false);
        toast.success("Product Added")

      } catch (error) {
        console.log(error)
        toast.error("");
        setLoading(false)

      }
    }
  };


  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/cart/get", {},
        { withCredentials: true })
      console.log(result.data)
      setCartItem(result.data)

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }


  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        const result = await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity },
          { withCredentials: true })
        console.log(result.data)

      } catch (error) {
        console.log(error)
        toast.error(error.message)

      }
    }
  }


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {

        }
      }
    }

    return totalCount;
  }


  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items)
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item]
          }
        } catch (error) {

        }
      }
    }
    return totalAmount;
  }


  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    getUserCart();
  }, [])

  let val = {
    products, currency, delivery_fee, getProducts, search, setSearch, showSearch, setShowSearch, cartItem, setCartItem, addToCart, getCartCount, getCartAmount, updateQuantity
  };

  return (
    <shopDataContext.Provider value={val}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;
