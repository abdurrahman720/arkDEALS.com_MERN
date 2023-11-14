import React from 'react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-gray-200 flex flex-col items-center justify-center h-screen">
      <img src="https://r4.wallpaperflare.com/wallpaper/200/450/437/humor-technology-broken-screen-wallpaper-793028bd31fa7d3b06f7885fb081163d.jpg" alt="Error 404: Page Not Found" className="w-1/2 mb-6" />
      <h1 className="text-4xl font-medium text-gray-800">404 Error</h1>
      <h2 className="text-2xl text-gray-800">Oops, we couldn't find that page.</h2>
      <p className="text-gray-800 mx-6">
        The page you're trying to access may have been removed, had its name changed, or is temporarily unavailable.
        We apologize for the inconvenience.
      </p>
      <p className="text-gray-800 mx-6">
        Please use the navigation above to find what you're looking for or visit our <Link to="/" className="text-blue-500 underline">homepage</Link>.
      </p>
      
    </div>
            <Footer></Footer>
       </div>
    );
};

export default ErrorPage;