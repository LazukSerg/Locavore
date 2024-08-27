import React, { Component, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import ProductsCategory from "./components/ProductsCategory";
import ShoppingCart from "./components/ShoppingCart";

function App() {

  useEffect(() => {
    EventBus.on("logout", () => {
      // this.logOut();
      logOut()
    });
  }, [])

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.logOut = this.logOut.bind(this);

//     this.state = {
//       showAdminBoard: false,
//       currentUser: undefined,
//     };
//   }

  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     this.setState({
  //       currentUser: user,
  //       showAdminBoard: user.roles.includes("ROLE_ADMIN"),
  //     });
  //   }
    
  //   EventBus.on("logout", () => {
  //     this.logOut();
  //   });
  // }

  // componentWillUnmount() {
  //   EventBus.remove("logout");
  // }

  

  function logOut() {
    AuthService.logout();
    EventBus.remove("logout");
    // this.setState({
    //   showAdminBoard: false,
    //   currentUser: undefined,
    // });
  }

  // render() {
    // const { currentUser, showAdminBoard } = this.state;

    return (
      <div>       
        {/* <BrowserRouter> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/category/:id" element={<ProductsCategory />} />
            <Route path="/bucket" element={<ShoppingCart />} />
            {/* <Route path="/send-order" element={<SendOrder />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        {/* </BrowserRouter> */}
        </div>
    );
  // }
}

export default App;
