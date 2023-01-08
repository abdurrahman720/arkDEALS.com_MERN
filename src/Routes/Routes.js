import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/GeneralLayout/Main";
import Blog from "../Pages/Blog/Blog";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import SellerLogin from "../Pages/AuthPages/SellerLogin";
import SellerRegister from "../Pages/AuthPages/SellerRegister";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts"
import BuyerRoute from "./BuyerRoute";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element:<Register></Register>
            },
            {
                path: "/blog",
                element: <BuyerRoute><Blog></Blog></BuyerRoute>
            },
            {
                path: "/seller-login",
                element: <SellerLogin></SellerLogin>
            },
            {
                path: "/seller-register",
                element: <SellerRegister></SellerRegister>
            }
        ]
        
        
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout></DashBoardLayout>,
        children: [
            {
                path: "/dashboard",
                element:<SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: "/dashboard",
                element: <BuyerRoute>
                    <MyOrders></MyOrders>
                </BuyerRoute>
            },
           
        ]
    }
])