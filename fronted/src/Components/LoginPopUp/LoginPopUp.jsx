import React, { use, useContext } from 'react'
import './LoginPopUp.css'
import { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function LoginPopUp({setShowLogin}) {

    const [currentState, setCurrentState] = useState('Login');
    const {setToken, url}  = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const handleData = (e) =>{
        const {name, value} = e.target;
        setData((data) =>({...data, [name]:value}));
    }

    useEffect( () =>{
        setMessage("");
        setData({
            name: "",
            email: "",
            password: "",
        });
    },[currentState])

    const onLogin = async (e) =>{

        const regex = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$^&*]).{8,}$/;
        if(!regex.test(data.password)){
            setMessage("password must be constains one uppercase letter, one number and one specail character")
        }
        e.preventDefault();

        let newUrl = `${url}/api/user`;
        if(currentState === "Login"){
            newUrl += '/login';
        }else{
            newUrl += '/register';
        }
        try{
            const response = await axios.post(newUrl,data);
            if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token);
                setShowLogin(false)
                 setData({
                    name:"",
                    email:"",
                    password:"",
                })

                navigate("/");
            }else{
                setMessage(response.data.message);
            }
            console.log(response.data);
        }catch(error){
            alert(error.message);
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={ ()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState === "Login"?<></>:<input type="text" placeholder='Your name' name='name' value={data.name} onChange={handleData} required />}
                <input type="email" placeholder='Your email'   value={data.email} onChange={handleData}  required name='email'/>
                <input type="password" name="password" id=""  placeholder='Your password' value={data.password} onChange={handleData} required/>
                <Link to="/forget" className='forgetL' onClick={() =>setShowLogin(false)}>Forget</Link>
            </div>
            <button type='submit'>{currentState ==="Sign Up"?"Create account":"Login"}</button>
            <p className='message'>{message}</p>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currentState === "Login"?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>:<p>Already have an account <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopUp