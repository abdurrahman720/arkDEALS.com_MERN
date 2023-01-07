import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SellerLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
        
        const [loginError, setLoginError] = useState('');
        
        const handleLogin = (data) => {
            console.log(data);
        }
        
      return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
               Sell your unused laptops and get the best price only on arkDEALS.com!
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                      <div className="card-body">
                      <form onSubmit={handleSubmit(handleLogin)} >
                        <h2 className="text-2xl text-center">Login as Seller</h2>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label"> <span className="label-text">Forget Password?</span></label>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-accent w-full' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                          </form>
                          <p className='text-sm'>New to arkDEALS.com? <Link className='text-secondary' to="/seller-register">Register as Seller</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline btn-secondary w-full'>CONTINUE WITH GOOGLE</button>
                      </div>
                     
            </div>
          </div>
        </div>
      );
};

export default SellerLogin;