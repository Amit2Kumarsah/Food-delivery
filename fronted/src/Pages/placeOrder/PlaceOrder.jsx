import React from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems,url} = useContext(StoreContext);
  const naviage = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName : "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })

  const handleInputData = (e) =>{
    const {name, value} = e.target;

    setData ( (prevData) => ({...prevData, [name]: value}));
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];

    food_list.map( (item, index) =>{
      if(cartItems[item._id] >0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() +2,
    }

    if (!/^\d+$/.test(data.phone)) {
      setMessage("Only Digits are allowed");
      return;
    }

    const response = await axios.post(`${url}/api/order/place`, orderData,{headers: {token}});

    if(response.data.success){
      setData({
        firstName: "",
        lastName : "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      })
      naviage("/myorders");
    }
  }

  useEffect ( () =>{
    if(!token){
      naviage("/cart");
    }else if(getTotalCartAmount() === 0){
      naviage("/cart");
    }
  },[token])
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" name="firstName" value={data.firstName} onChange={handleInputData}  required/>
          <input type="text" placeholder="Last Name" name="lastName" value={data.lastName} onChange={handleInputData} required />
        </div>

        <input type="email" placeholder="Email" name="email" value={data.email} onChange={handleInputData} required />
        <input type="text" placeholder="Street" name="street" value={data.street} onChange={handleInputData} required />

        <div className="multi-fields">
          <input type="text" placeholder="City" name="city" value={data.city} onChange={handleInputData}  required/>
          <input type="text" placeholder="State" name="state" value={data.state} onChange={handleInputData} required />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="zip code" name="zipCode" value={data.zipCode} onChange={handleInputData} required/>
          <input type="text" placeholder="Country" name="country" value={data.country} onChange={handleInputData} required/>
        </div>

        <input type="text" placeholder="Phone" name="phone" value={data.phone} onChange={handleInputData} required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type="submit">Order Food</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
