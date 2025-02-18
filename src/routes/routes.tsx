import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home/Home";
import About from "../pages/about/About";
import AllProducts from "../pages/allProducts/AllProducts";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Login from "../pages/login/Login";
import Checkout from "../pages/checkout/Checkout";
import ProtectedRoute from "./ProtectedRoute";

import Register from "../pages/register/Register";
import ManageBike from "../pages/admin/manage-bike/ManageBike";
import ManageUser from "../pages/admin/manage-user/ManageUser";
import ManageOrder from "../pages/admin/manage-order/ManageOrder";
import CreateBike from "../pages/admin/CreateBike";
import UpdateBike from "../pages/admin/manage-bike/UpdateBike";
import OrdersView from "../pages/user/OrdersView";
import CreateOrder from "../pages/user/CreateOrder";
import UpdatePassword from "../pages/user/UpdatePassword";
import VerifyOrder from "../pages/order/VerifyOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path: "create-bike",
        element: (
          <ProtectedRoute role="admin">
            <CreateBike />
          </ProtectedRoute>
        ),
      },

      {
        path: "manage-bike",
        element: (
          <ProtectedRoute role="admin">
            <ManageBike />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-user",
        element: (
          <ProtectedRoute role="admin">
            <ManageUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <ProtectedRoute role="admin">
            <ManageOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-order",
        element: (
          <ProtectedRoute role="customer">
            <CreateOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-password",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-view",
        element: (
          <ProtectedRoute role="customer">
            <OrdersView />
          </ProtectedRoute>
        ),
      },
      {
        path: "verify-order",
        element: (
          <ProtectedRoute role="customer">
            <VerifyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-bike/:id",
        element: (
          <ProtectedRoute role="admin">
            <UpdateBike />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "checkout/:product",
        element: (
          <ProtectedRoute role="customer">
            <Checkout></Checkout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
