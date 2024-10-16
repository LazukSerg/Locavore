import React, { Component, useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import { Link } from 'react-router-dom';
import App from '../App'
import "./header.css"
import { withRouter } from '../common/with-router';

function Header() {

  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user)
    }    
    getUser()
  }, [])

  return (
          <div>
            <div className="header">
              <div>
                <h1 className="title">ФЕРМА "ЛОКАВОРСТВО"</h1>
                <p className="subtitle">Для ценителей продукции со своей грядки</p>
              </div>
              <button className="auth-button">
              {!currentUser && (<Link className='auth-button-text' to={`/login`}>Авторизация</Link>)}
              {currentUser && (<p className="auth-button-text">{currentUser.username}</p>)}
              </button>
              <div className="dropdown">
                <button className="menu-button">
                  <img src="/menu.svg"></img>
                </button>
                <div className="dropdown-content">
                  <Link className='dropdown-item' to={`/about`}>О НАС</Link>
                  <Link className='dropdown-item' to={`/profile`}>МОЙ ПРОФИЛЬ</Link>
                  <Link className='dropdown-item' to={`/home`}>КАТАЛОГ ПРОДУКЦИИ</Link>
                  <Link className='dropdown-item' to={`/contacts`}>КОНТАКТЫ</Link>
                  <Link className='dropdown-item' onClick={() => EventBus.dispatch("logout")} to={`/login`}>ВЫЙТИ</Link>
                  
              </div>
              </div>
              
              
              
            </div>
          </div>
        );
}

export default withRouter(Header);
