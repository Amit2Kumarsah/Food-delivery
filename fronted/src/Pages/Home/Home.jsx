import React, { useContext, useState } from 'react'
import './Home.css'
import Header from '../../Components/Navbar/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import SearchFood from '../../Components/SearchFood/SearchFood';
import { StoreContext } from '../../Context/StoreContext';

function Home() {

  const [category, setCategory] = useState('All');
  const {searchFoods} = useContext(StoreContext);

  return (
    <div>
      { searchFoods && <SearchFood  setCategory = {setCategory}/>}
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home