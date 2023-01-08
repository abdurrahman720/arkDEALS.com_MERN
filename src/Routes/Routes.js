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
import Overview from "../Pages/Dashboard/OverView/Overview";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import PrivateRoute from "./PrivateRoute";

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
                element: <PrivateRoute>
                    <Blog></Blog>
                </PrivateRoute>
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
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element:<PrivateRoute><Overview></Overview></PrivateRoute>
            },
            //for buyer
            {
                path: "/dashboard/myorders",
                element: <BuyerRoute>
                    <MyOrders></MyOrders>
                </BuyerRoute>
            },
            //for seller
            {
                path: "/dashboard/myproducts",
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: "/dashboard/addproduct",
                element: <SellerRoute>
                    <AddProduct></AddProduct>
                </SellerRoute>
            }
           
        ]
    }
])