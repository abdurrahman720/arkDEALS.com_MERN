import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/GeneralLayout/Main";
import Blog from "../Pages/Blog/Blog";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import SellerLogin from "../Pages/AuthPages/SellerLogin";
import SellerRegister from "../Pages/AuthPages/SellerRegister";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import BuyerRoute from "./BuyerRoute";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import SellerRoute from "./SellerRoute";
import Overview from "../Pages/Dashboard/OverView/Overview";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import PrivateRoute from "./PrivateRoute";
import BrowseLayout from "../Layout/BrowseLayout/BrowseLayout";
import Browse from "../Pages/Browse/Browse";
import BrowseByCate from "../Pages/Browse/BrowseByCate";
import Product from "../Pages/Product/Product";
import AdminRoute from "./AdminRoute";
import Allselller from "../Pages/Dashboard/Admin/Allselller";
import Allbuyer from "../Pages/Dashboard/Admin/Allbuyer";
import Reported from "../Pages/Dashboard/Admin/Reported";
import ErrorPage from "../Pages/Error/ErrorPage";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers";
import MyReported from "../Pages/Dashboard/Buyer/MyReported";
import Payment from "../Pages/Dashboard/Buyer/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/browse",
        element: <BrowseLayout></BrowseLayout>,
        children: [
          {
            path: "/browse",
            element: <Browse></Browse>,
          },
          {
            path: `/browse/category/:id`,
            loader: ({ params }) =>
              fetch(
                `${process.env.REACT_APP_SERVER}/productsByCategory/${params.id}`
              ),
            element: <BrowseByCate></BrowseByCate>,
          },
          {
            path: `/browse/product/:id`,
            loader: ({ params }) =>
              fetch(`${process.env.REACT_APP_SERVER}/product/${params.id}`),
            element: (
              <PrivateRoute>
                <Product></Product>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/seller-login",
        element: <SellerLogin></SellerLogin>,
      },
      {
        path: "/seller-register",
        element: <SellerRegister></SellerRegister>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Overview></Overview>
          </PrivateRoute>
        ),
      },
      //for buyer
      {
        path: "/dashboard/myorders",
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/my-reported-items",
        element: (
          <BuyerRoute>
            <MyReported></MyReported>
          </BuyerRoute>
        ),
      },
      {
        path: `/dashboard/payment/:id`,
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_SERVER}/orders/${params.id}`),
      },

      //for seller
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRoute>
            <MyBuyers></MyBuyers>
          </SellerRoute>
        ),
      },
      //for admin
      {
        path: "/dashboard/allseller",
        element: (
          <AdminRoute>
            <Allselller></Allselller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyer",
        element: (
          <AdminRoute>
            <Allbuyer></Allbuyer>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedproducts",
        element: (
          <AdminRoute>
            <Reported></Reported>
          </AdminRoute>
        ),
      },
    ],
  },
]);
