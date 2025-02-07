import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home/Home";
import About from "../pages/about/About";
import AllProducts from "../pages/allProducts/AllProducts";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Login from "../pages/login/Login";
import Checkout from "../pages/checkout/Checkout";
import ProtectedRoute from "./ProtectedRoute";
import CreateBike from "../components/ui/admin/bike/CreateBike";
import UpdateBike from "../components/ui/admin/bike/UpdateBike";
import DeleteBike from "../components/ui/admin/bike/DeleteBike";
import CreateOrder from "../components/ui/user/CreateOrder";
import UpdatePassword from "../components/ui/user/UpdatePassword";

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
        path: "update-bike",
        element: (
          <ProtectedRoute>
            <UpdateBike />
          </ProtectedRoute>
        ),
      },
      {
        path: "delete-bike",
        element: (
          <ProtectedRoute>
            <DeleteBike />
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout></Checkout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
