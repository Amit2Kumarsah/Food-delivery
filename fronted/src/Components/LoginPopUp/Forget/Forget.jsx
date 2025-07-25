import React, { useState, useEffect, useContext } from "react";
import "./Forget.css";
import LoginPopUp from "../LoginPopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../Context/StoreContext";

function Forget() {
  const [button, setButton] = useState("mail");
  const [isAcive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  const {url} = useContext(StoreContext);

  const [data, setData] = useState({
    email: "",
    otp:"",
    newPassword:"",
  })

  useEffect(() => {
    if (!isRunning || seconds === 0) return; // Don't start if not running or seconds are 0

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval); // Clear interval when seconds reach 0
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup on unmount or when the countdown stops
    return () => clearInterval(interval);
  }, [seconds, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleInput = (e) =>{
    const {name, value} = e.target;
    setData((data) =>({...data, [name]:value}));
  }

  const handleSend = async (e,endPoint) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`${url}/api/forget/${endPoint}`, data);

      // showing message
      setMessage(response.data.message);

      // hndle button state

      if(response.data.message === "OTP send successfully"){
        setButton("otp");
        setIsActive(true);
        setSeconds(10);
        handleStart();
      }else if(response.data.message === "OTP verified"){
        setButton("reset");
      }


      // naviage to home page
      if(response.data.message === "password is reset successfull"){
        navigate("/");
      }

    }catch(err){
      console.log("Error occurs",err);
      // setMessage(err);
    }
  } 


  return (
    <div className="forgetMain">

      <div className="forget">
        {/* Email section */}
        <div className="forgetItem">
          <input type="email" id="email" name="email" value={data.email} onChange={handleInput}/>
          <label htmlFor="email" className={`${data.email?"labelActive":""}`}>Email</label>
          {button === "mail" ? (
            <button onClick={(e) => {handleSend(e,"sendEmail")}} className="sendingButton" disabled ={!data.email}>Send OTP</button>
          ) : 
              <div className="resendBlock">
                <p 
                onClick={(e) =>{
                  if(seconds > 1){
                    setSeconds(10);
                    handleStart();
                  }
                  handleSend(e, "sendEmail");
                }}
                style={ {
                  color: (seconds > 1 || button === "reset" )? "gray": "tomato",
                  cursor : (seconds > 1 || button === "reset")? "not-allowed" : "pointer",
                }}
              >resend OTP</p>
              <p style={{color:"red"}}>{seconds} seconds</p>
              </div>
            }
          
        </div>
        {/* otp section */}
        <div className="forgetItem">
          <input type="text" id="otp" name="otp" value={data.otp} onChange={handleInput} />
          <label htmlFor="otp" className={`${data.otp ?"labelActive":""}`}>OTP</label>
          {button === "otp" ? (
            <button onClick={(e) => {handleSend(e, "otp")}} className="sendingButton" disabled={!data.otp}>Verify OTP</button>
          ) : null}
        </div>
        {/* reset password section */}
        <div className="forgetItem">
          {isAcive ? <input type="text" id="password" name="newPassword" value={data.newPassword} onChange={handleInput} />:<input type="password" id="password" name="newPassword" value={data.newPassword} onChange={handleInput} />}
          <label htmlFor="password" className={`${data.newPassword || isAcive?"labelActive":""}`}>New password</label>
          <button className = {`view ${isAcive ?"active":""}`} onClick={() =>setIsActive(!isAcive)}></button>
          {button === "reset" ? <button className="sendingButton" onClick={(e) => handleSend(e, "reset")} disabled={!data.newPassword}>Reset</button> : null}
        </div>
        
        {/* Showing message */}
        <p className="message">{message}</p>
      </div>
      
    </div>
  );
}

export default Forget;
