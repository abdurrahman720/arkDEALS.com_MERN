import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/png/logo.png'

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded font-custom1">
        <div className="grid grid-flow-col gap-4">
        <Link to="/"  className="link link-hover">About us</Link> 
         <Link to="/" className="link link-hover">Contact</Link> 
         <Link to="/" className="link link-hover">Jobs</Link> 
         <Link to="/" className="link link-hover">Press kit</Link>
        </div> 
        <div>
          <div className="grid grid-flow-col gap-4">
           <img className='w-36' src={logo} alt="" />
          </div>
        </div> 
        <div>
          <p>Copyright © 2023 - All right reserved by arkDEALS.com</p>
        </div>
      </footer>
    );
};

export default Footer;