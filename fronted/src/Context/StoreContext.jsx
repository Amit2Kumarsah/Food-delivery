import axios from "axios";
import { createContext, useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import { useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState([]);
  const [token, setToken] = useState("");
  const [searchFoods, setSearchFoods] = useState(false);
  const url = "https://food-delivery-backend-npit.onrender.com";


  useEffect( () =>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  },[])
  const fetchFood = async (e) =>{
    try{
      const response = await axios.get(`${url}/api/food/list`);
      setFood_list(response.data.data);
    }catch(err) {
      console.log("Error is :",err);
    }
  }

  useEffect( () =>{
    fetchFood();
  },[]);

  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));

    if(token){
        await axios.post(`${url}/api/cart/remove`, {itemId}, {headers:{token}});
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((food) => food._id === item);
        totalAmount += itemInfo ? itemInfo.price * cartItems[item] : 0;
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token) => {
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/get`,
          {},
          { headers: { token } }
        );
        setCartItems(response.data.cartData);
      } catch (err) {
        console.log("Error fetching cart data:", err);
      }
    }
  };

  useEffect( () =>{
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      loadCartData(token);
    }
  },[token]);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    setFood_list,
    token,
    setToken,
    searchFoods,
    setSearchFoods,
    url,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
