import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {

  const [list, setList] = useState([]);

  const fetchList = async() =>{
      try{
        const response = await axios.get('http://localhost:4000/api/food/list');
        setList(response.data.data);
      }catch(err){
        toast.error("error")
      }
  }

  const removeFromList = async (e,foodId) =>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:4000/api/food/remove',{id:foodId});
      toast.success("Item removed sucessfully");
      await fetchList();

    }catch(err){
        toast.error("Occur some errors");
    }
  }

  useEffect( () =>{
    fetchList();
  },[]);
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map( (item, index) =>{
          return (
            <div key={index} className='list-table-format'>
              <img src={'http://localhost:4000/images/'+item.image} alt=""  />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={(e) =>removeFromList(e,item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List