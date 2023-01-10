import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/png/logo.png";
import { FiLogOut } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/')
        toast.info('Logged Out!');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { register, handleSubmit } = useForm();
 
 
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/browse">Browse</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
    </>
  );

  const handlelogin = (data) => {
    console.log(data.login);
    if (data.login === "Buyer Login") {
      navigate('/login');
    }
    if (data.login === "Seller Login") {
      navigate('/seller-login')
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="w-36">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <>
            
            <label htmlFor="dashboard-drawer" className="btn btn-accent drawer-button md:hidden">Dashboard</label>
            
            <Link to='/dashboard' className="btn btn-accent hidden md:flex">Dashboard</Link>

            <Link onClick={handleLogOut} className="ml-2 ">
              <FiLogOut className="" />
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit(handlelogin)}>
            <div className="flex items-center">
              <select
                {...register("login")}
                className="select input-bordered max-w-xs"
              >
                <option selected>Buyer Login</option>
                <option>Seller Login</option>
              </select>
              <input className="btn btn-xs ml-2" type="submit" value="Go" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Navbar;
