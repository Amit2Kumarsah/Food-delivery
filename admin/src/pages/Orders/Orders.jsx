import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react';
import {toast} from "react-toastify";
import {assets} from "../../assets/admin_assets/assets"

function Orders() {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    try{
      const response = await axios.get("https://food-delivery-backend-npit.onrender.com/api/order/list");
      setOrders(response.data.data);
    }catch(err){
      toast.error("Error");
    }
  }

  const statusHandler = async (event, orderId) =>{
    try{
      const response = await axios.post("https://food-delivery-backend-npit.onrender.com/api/order/status", {
        orderId,
        status: event.target.value
      })

      await fetchAllOrders();
    }catch(err){
      console.log("Error is : ", err);
      toast.error("Error in updating status");
    }
  }

  useEffect( () =>{
    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map( (order , index) =>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />

            <div>
              <p className='order-item-food'>
                {order.items.map( (item , index) =>{
                  if(index === order.items.length -1){
                    return item.name + " X " + item.quantity;
                  }else{
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
              </div>

              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders