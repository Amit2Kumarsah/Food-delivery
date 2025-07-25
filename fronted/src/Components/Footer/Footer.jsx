import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className='footer-content-left'>
                <img src={assets.logo} alt="" />
                <p>Tomato is a fast, reliable, and user-friendly food delivery platform connecting you with your favorite local restaurants. Built with care by Mait Kumar, we’re committed to delivering great food, on time, every time. Whether you’re craving something spicy, sweet, or savory — Tomato delivers it right to your doorstep</p>
                <div className='footer-social-icons'>
                    <a href="https://www.facebook.com/amit.kumar.259354" target='blank'><img src={assets.facebook_icon} alt="" /></a>
                    <a href="https://x.com/AMITKUM07856858?t=OPvqRadaDcsAI90kcR9jzw&s=09" target='blank'><img src={assets.twitter_icon} alt="" /></a>
                    <a href="https://www.linkedin.com/in/amit-kumar-87b4b1286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='blank'><img src={assets.linkedin_icon} alt="" /></a>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-9508470901</li>
                    <li>sah771382@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>copyright 2025 &copy; Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer