import React from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../../assets/png/laptop.png'

const Banner = ({isSeller}) => {
    return (
        <section className="bg-base-200">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl ">Biggest laptop reseller worldwide!</h1>
                <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-lg text-primary font-custom2">Get the best deals on gently used laptops from trusted sellers. Shop a wide selection of makes and models at great prices. Buy now or list your own laptop for sale on our secure platform.</p>
                <Link to='/browse' className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900 rounded-lg bg-primary-700 hover:bg-accent focus:ring-4 focus:ring-primary-300 focus:ring-primary-900">   
                    Buy Laptop
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
                    {
                        isSeller===true ? <Link to='/dashboard/addproduct' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100 hover:text-white  hover:bg-gray-700">
                        Sell Laptop
                     </Link> : <Link to='/seller-login' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100 hover:text-white  hover:bg-gray-700">
                   Sell Laptop
                </Link> 
                }
               
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img className='' src={laptop} alt="mockup"/>
            </div>                
        </div>
    </section>
    );
};

export default Banner;