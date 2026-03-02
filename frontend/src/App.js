import React, { Component, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./pages/login.component";
import Register from "./pages/register.component";
import Home from "./pages/home.component";
import EventBus from "./common/EventBus";
import ProductsCategory from "./components/ProductsCategory";
import ShoppingCart from "./pages/ShoppingCart";
import ProductInfo from "./pages/ProductInfo";
import ProductsSeller from "./pages/ProductsSeller";
import MyOrders from "./pages/MyOrders";
import OrderInfo from "./pages/OrderInfo";
import ShowCatalog from "./pages/ShowCatalog";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";

function App() {

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut()
    });
  }, [])


  function logOut() {
    AuthService.logout();
    EventBus.remove("logout");
  }


    return (
      <div>       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/category/:id" element={<ProductsCategory />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/bucket" element={<ShoppingCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productsSeller/:id" element={<ProductsSeller />} />
            <Route path="/orders/:id" element={<MyOrders />} />
            <Route path="/orderInfo/:id" element={<OrderInfo />} />
            <Route path="/showCatalog/:id" element={<ShowCatalog />} />
            <Route path="/createProduct" element={<NewProduct />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
          </Routes>
      </div>
    );
}

export default App;
