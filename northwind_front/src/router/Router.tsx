import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Suppliers from "../pages/Suppliers/Suppliers";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import Employees from "../pages/Employees/Employees";
import Customers from "../pages/Customers/Customers";
import Search from "../pages/Search/Search";
import Supplier from "../pages/Supplier/Supplier";
import Order from "../pages/Order/Order";
import Employee from "../pages/Employee/Employee";
import Customer from "../pages/Customer/Customer";
import Product from "../pages/Product/Product";

const setRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dash",
          element: <Dashboard />,
        },
        {
          path: "/suppliers",
          element: <Suppliers />,
        },
        {
          path: "/supplier/:id",
          element: <Supplier />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/order/:id",
          element: <Order />,
        },
        {
          path: "/employees",
          element: <Employees />,
        },
        {
          path: "/employee/:id",
          element: <Employee />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/customer/:id",
          element: <Customer />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
  ]);

export default setRouter;
