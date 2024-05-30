import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/toaster"
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./components/pages/AllProducts.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage.jsx";
import CartList from "./components/pages/CartList.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import CreateProduct from "./components/smallComponents/CreateProduct.jsx";
import UpdateProduct from "./components/pages/UpdateProduct.jsx";
import AllProductInfiniteQuery from "./components/pages/AllProductInfiniteQuery.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:page",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/infiniteHome",
        element: <AllProductInfiniteQuery />,
      },
      {
        path: "/cart",
        element: (
          <AuthLayout authentication={true}>
            <CartList />
          </AuthLayout>
        ),
      },
      {
        path: "/createProduct",
        element: (
          <AuthLayout authentication={true}>
            <CreateProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/updateProduct/:id",
        element: (
          <AuthLayout authentication={true}>
            <UpdateProduct/>
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <Toaster />
    </QueryClientProvider>
  </Provider>
);
