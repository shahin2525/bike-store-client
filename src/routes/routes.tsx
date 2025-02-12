import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home/Home";
import About from "../pages/about/About";
import AllProducts from "../pages/allProducts/AllProducts";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Login from "../pages/login/Login";
import Checkout from "../pages/checkout/Checkout";
import ProtectedRoute from "./ProtectedRoute";

// import CreateOrder from "../components/ui/user/CreateOrder";
// import UpdatePassword from "../components/ui/user/UpdatePassword";
import Register from "../pages/register/Register";
import ManageBike from "../pages/admin/manage-bike/ManageBike";
import ManageUser from "../pages/admin/manage-user/ManageUser";
import ManageOrder from "../pages/admin/manage-order/ManageOrder";
import CreateBike from "../pages/admin/CreateBike";
import UpdateBike from "../pages/admin/manage-bike/UpdateBike";
import OrdersView from "../pages/user/OrdersView";
import CreateOrder from "../pages/user/CreateOrder";
import UpdatePassword from "../pages/user/UpdatePassword";

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
          <ProtectedRoute>
            <CreateBike />
          </ProtectedRoute>
        ),
      },

      {
        path: "manage-bike",
        element: (
          <ProtectedRoute>
            <ManageBike />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-user",
        element: (
          <ProtectedRoute>
            <ManageUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <ProtectedRoute>
            <ManageOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-order",
        element: (
          <ProtectedRoute>
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
          <ProtectedRoute>
            <OrdersView />
          </ProtectedRoute>
        ),
      },
      {
        path: "update-bike/:id",
        element: (
          <ProtectedRoute>
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
          <ProtectedRoute>
            <Checkout></Checkout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
