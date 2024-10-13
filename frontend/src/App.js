import React, { Component, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import EventBus from "./common/EventBus";
import ProductsCategory from "./components/ProductsCategory";
import ShoppingCart from "./components/ShoppingCart";

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
            <Route path="/bucket" element={<ShoppingCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    );
  // }
}

export default App;
