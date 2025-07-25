import React, { useContext } from 'react';
import './AccountMain.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

function AccountMain() {
  const {setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () =>{
      localStorage.removeItem("token");
      setToken("");
    navigate("/");
  }
  return (
    <div className='profile'>
        <img src={assets.profile_icon} alt="" />
        <ul className='profile-dropdown'>
          <li onClick={() =>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
        </ul>
    </div>
  )
}

export default AccountMain