import React from 'react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';

const ErrorPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-base-200 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-medium text-gray-800">404 Error</h1>
      <h2 className="text-2xl text-gray-800">Oops, we couldn't find that page.</h2>
      <p className="text-gray-800 mx-6">
        The page you're trying to access may have been removed, had its name changed, or is temporarily unavailable.
        We apologize for the inconvenience.
      </p>
      <p className="text-gray-800 mx-6">
        Please use the navigation above to find what you're looking for or visit our <a href="/" className="text-blue-500 underline">homepage</a>.
      </p>
      <p className="text-gray-800 mx-6">
        If you think this is a mistake, please <a href="contact-us" className="text-blue-500 underline">contact us</a> and we'll do our best to help.
      </p>
            </div>
            <Footer></Footer>
       </div>
    );
};

export default ErrorPage;