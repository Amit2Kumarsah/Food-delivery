import React from 'react'
import './MyOrder.css'
import { useState } from 'react'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/frontend_assets/assets'

function MyOrder() {
    const {token,url} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () =>{
        try{
            const response = await axios.post(`${url}/api/order/userOrders`,{},{headers:{token}});
            setData(response.data.data);
        }catch(err){
            console.log("Error fetching orders: ", err);
        }
    }

    useEffect( () =>{
        if(token){
            fetchOrders();
        }
    },[token]);

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map( (order , index) =>{
                return (
                    <div className="my-orders-order" key={index}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map( (item ,index) =>{
                            if(index === order.items.length -1){
                                return item.name + " X" + item.quantity;
                            }else{
                                return item.name + " X" + item.quantity + ", ";
                            }
                        })}</p>

                        <p>${order.amount}</p>
                        <p>Items : {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default MyOrder