import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/index";
import { Cart } from "./pages/cart/index";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
export { router };
