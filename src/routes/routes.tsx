import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home/Home";
import About from "../pages/about/About";
import AllProducts from "../pages/allProducts/AllProducts";
import ProductDetails from "../pages/productDetails/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
        path: "product-details",
        element: <ProductDetails />,
      },
    ],
  },
]);
