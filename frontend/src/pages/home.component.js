import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import "./home.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import CategoryService from "../services/category.service";
import Category from "../components/Category"
import Product from "../components/Product";
import "../components/AllProducts.css"
import regionService from "../services/region.service";
import Footer from "../components/Footer";

const API_URL = "http://localhost:8080/api/";

function Home() {

  const [sellers, setSellers] = useState('');
  const [regions, setRegions] = useState('');
  const [categories, setCategories] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const fetchSellers = async() => {
      const res = await UserService.getAllSellers();
      setSellers(res.data)
      setFilteredSellers(res.data)
    }
    const fetchRegions = async() => {
      const res = await regionService.getAll();
      setRegions(res.data)
    }
    const fetchCategories = async() => {
      const res = await CategoryService.getAll();
      setCategories(res.data)
    }
    const fetchUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user)
    } 
       
    fetchUser()
    fetchSellers()
    fetchRegions()
    fetchCategories()
    
      
  }, [])

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSellers, setFilteredSellers] = useState('');

  // Эффект для фильтрации при изменении выбранных фильтров
  useEffect(() => {
    let result = sellers;
    
    if (selectedRegion) {
      result = result.filter(seller => seller.region?.name === selectedRegion);
    }
    
    if (selectedCategory) {
      result = result.filter(seller => 
        seller.products?.some(product => product.category?.name === selectedCategory)
      );
    }
    
    setFilteredSellers(result);
  }, [selectedRegion, selectedCategory, sellers]);

  return (
    
    <div className="back">
      <Header/>

        <div className="sellers-container">
          {/* Блок фильтров */}
          <div className="filters-section">

            {/* Фильтр по региону */}
            <div className="filter-group">
              <label>Регион:</label>
              <select 
                value={selectedRegion} 
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Все регионы</option>
                {regions && regions.map(region => (
                  <option key={region.id} value={region.name}>{region.name}</option>
                ))}
              </select>
            </div>
              
            {/* Фильтр по категории */}
            <div className="filter-group">
              <label>Категория товаров:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Все категории</option>
                {categories && categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
              
            {/* Кнопка сброса фильтров */}
            <button 
              onClick={() => {
                setSelectedRegion('');
                setSelectedCategory('');
              }}
              className="reset-filters-btn"
            >
              Сбросить фильтры
            </button>
          </div>
            
          {/* Список отфильтрованных продавцов */}
          <div className="sellers-list">
          {filteredSellers.length > 0 ? filteredSellers.map(seller => (
            <Link 
              to={`/productsSeller/${seller.id}`} 
              key={seller.id}
              className="seller-card"
            >
              <div>{seller.username}</div>
              <div>{seller.region.name}</div>
              <div>{`${seller.city}, ${seller.street}, ${seller.building}`}</div>
              <div className="seller-card-categories">
                <div className="categories-label">Категории товаров:</div>
                <div className="categories-vertical-list">
                  {seller.products && seller.products.length > 0 ? (
                    [...new Set(seller.products.map(product => product.category?.name))]
                      .filter(category => category)
                      .map((category, index) => (
                        <div key={index} className="category-item">
                          {category}
                        </div>
                      ))
                  ) : (
                    <div className="no-categories">нет категорий</div>
                  )}
                </div>
              </div>
            </Link>
          )) : (
              <div className="no-results">Продавцы не найдены</div>
            )}
          </div>
        </div>

      <div className="down-container fixed-element">
        <Link to={currentUser ? `/bucket` : '/login'}>
          <div className="wrapper-bucket bucket">
            <img src="/корзина.jpeg"></img>
          </div>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

export default withRouter(Home);
