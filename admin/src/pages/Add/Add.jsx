import React, { useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../assets/admin_assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add() {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name:"",
    description: "",
    price: 0,
    category: "Salad",
  })

  const handleInputData = (e) =>{
    const{name, value} = e.target;
    setData( (data) =>({...data, [name]:value}));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image",image);

    try{
      const response = await axios.post('http://localhost:4000/api/food/add',formData);

      setData({
        name: "",
        description:"",
        price:0,
        category:"",
      })
      setImage(false);
      toast.success(response.data.message);
    }catch(err){
        toast.error(err)
    }finally{
        setLoading(false);
    }
  }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Uload Image</p>
          <label htmlFor="image"><img src={image?URL.createObjectURL(image):assets.upload_area} alt="" /></label>
          <input type="file" id="image" hidden required onChange={ (e) => setImage(e.target.files[0])} />
        </div>

        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input type="text" name='name' placeholder='Type here' value={data.name} onChange={handleInputData}/>
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea name="description" rows="6" placeholder='Write content here' required value={data.description} onChange={handleInputData}></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={handleInputData}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="Number" name='price' placeholder='$20' value={data.price} onChange={handleInputData}/>
          </div>
        </div>
        <button type='submit' className='add-btn' disabled = {loading}>{loading?'Adding...':'ADD'}</button>
      </form>
    </div>
  )
}

export default Add