import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';

const Register = () => {
    
    const {emailSignUp,updateName} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
        const navigate = useNavigate()
        const [signError, setSignError] = useState('');
        
    const handleSignIn = (data) => {
            setSignError('')
            console.log(data);
            emailSignUp(data.email, data.password)
                .then(userCredentials => {
                    const signedInUser = userCredentials.user;
                    console.log(signedInUser);
                    updateName(data.name)
                        .then(() => {
                            console.log('name updated');
                            const user = {
                                name: data.name,
                                email: data.email,
                                role: 'buyer'
                            }
                            fetch(`http://localhost:5001/add-users`, {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log('user saved to database');
                                //jwt token
                                    fetch(`http://localhost:5001/jwt?email=${data.email}`)
                                        .then(res => res.json())
                                        .then(data => {
                                            console.log(data.accessToken);
                                            localStorage.setItem('arkDeals', data.accessToken);
                                            toast.success("Registration Success!")
                                            navigate('/')
                                    })
                            })
                    })
                })
                .catch(error => {
            setSignError(error.message)
        })
        }
        
      return (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register Now!</h1>
              <p className="py-6">
                Get the best deals for your preferred laptop with the best price
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                      <div className="card-body">
                      <form onSubmit={handleSubmit(handleSignIn)} >
                              <h2 className="text-2xl text-center">Register as Buyer</h2>
                              <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Full Name</span></label>
                            <input type="text"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                        </div>
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
                            
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-accent w-full mt-5' value="Register as Buyer" type="submit" />
                        <div>
                            {signError && <p className='text-red-600'>{signError}</p>}
                        </div>
                          </form>
                          <p className='text-sm'>Want to sell on arkDEALS.com? <Link className='text-secondary' to="/seller-register">Register as Seller</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline btn-secondary w-full'>CONTINUE WITH GOOGLE</button>
                      </div>
                     
            </div>
          </div>
        </div>
      );
};

export default Register;