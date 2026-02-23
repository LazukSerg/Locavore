import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { useParams, Link } from 'react-router-dom';
import "./home.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import CategoryService from "../services/category.service";
import Category from "../components/Category"
import Product from "../components/Product";
import "../components/AllProducts.css"
import productService from "../services/product.service";

const API_URL = "http://localhost:8080/api/";

function Home() {

  const [products, setProducts] = useState('');
  const [categories, setCategories] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async() => {
      const res = await CategoryService.getAll();
      setCategories(res.data)
    }
    const fetchProducts = async() => {
      const res = await productService.getAllProducts(id);
      setProducts(res.data);
    }
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    }    
    getUser()
    // rs()
    fetchProducts()
    
      
  }, [id])

  const getCategories = categories => {
    let content = [];
    for (let i = 0; i < 4; i++) {
      const data = categories[i]
      content.push(<Category key={i} id={data.id} image={data.image} name={data.name}/>)
    }
    return content
  };

  const getProducts = products => {
      let content = [];
      for (let i = 0; i < products.length; i++) {
        const data = products[i]
        content.push(<Product key={data.id} item={data} cart={false}/>)
      }
      return content
    };

  return (
    
    <div className="back">
      <Header/>
      <div className='categories-list'>
        {categories && (getCategories(categories))}
      </div>
      {/* <div className='all-products-flex'> */}

      
        <div className='all-products-list'>
          {products && (getProducts(products))}
        </div>        

      {/* </div> */}
      <div className="down-container fixed-element">
        <Link to={currentUser ? `/bucket` : '/login'}>
          <div className="wrapper-bucket bucket">
            <img src="/корзина.jpeg"></img>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Home);
