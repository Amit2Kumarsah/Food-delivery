import React, { useContext, useState } from 'react';
import "./SearchFood.css";

function SearchFood({setCategory}) {
  const [searchInput, setSearchInput] = useState("");

  const handleSetCategory = (e) =>{
    setCategory(searchInput);
  }
  return (
    <div className='search'>
        <input type="text" name="food" value={searchInput}  placeholder='Search food' className='search-items'  onChange={(e) =>setSearchInput(e.target.value)}/>
        <button className='search-items' onClick={handleSetCategory}>Search</button>
    </div>
  )
}

export default SearchFood