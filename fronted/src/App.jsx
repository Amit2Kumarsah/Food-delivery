import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Forget from "./Components/LoginPopUp/Forget/Forget";



import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/placeOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopUp from "./Components/LoginPopUp/LoginPopUp";
import MyOrder from "./Pages/MyOrder/MyOrder";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/forget" element={<Forget />} />
          <Route path = "/myorders" element = {<MyOrder/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
