import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import "./home.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import CategoryService from "../services/category.service";
import "../components/AllProducts.css"
import regionService from "../services/region.service";
import Footer from "../components/Footer";

function Home() {
  // Состояния для данных
  const [sellers, setSellers] = useState([]);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSellers, setFilteredSellers] = useState([]);
  
  // Состояние загрузки
  const [loading, setLoading] = useState(true);
  
  // Состояние для отслеживания завершения всех запросов
  const [dataLoaded, setDataLoaded] = useState({
    user: false,
    sellers: false,
    regions: false,
    categories: false
  });

  useEffect(() => {
    const fetchSellers = async() => {
      try {
        const res = await UserService.getAllSellers();
        setSellers(Array.isArray(res.data) ? res.data : []);
        setFilteredSellers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Ошибка загрузки продавцов:', error);
        setSellers([]);
        setFilteredSellers([]);
      } finally {
        setDataLoaded(prev => ({ ...prev, sellers: true }));
      }
    }
    
    const fetchRegions = async() => {
      try {
        const res = await regionService.getAll();
        setRegions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Ошибка загрузки регионов:', error);
        setRegions([]);
      } finally {
        setDataLoaded(prev => ({ ...prev, regions: true }));
      }
    }
    
    const fetchCategories = async() => {
      try {
        const res = await CategoryService.getAll();
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        setCategories([]);
      } finally {
        setDataLoaded(prev => ({ ...prev, categories: true }));
      }
    }
    
    const fetchUser = async() => {
      try {
        const user = await AuthService.getCurrentUser();
        setCurrentUser(user);
        
        // Устанавливаем регион пользователя, если он есть
        if (user && user.region) {
          setSelectedRegion(user.region);
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
        setCurrentUser(null);
      } finally {
        setDataLoaded(prev => ({ ...prev, user: true }));
      }
    } 
       
    // Запускаем все запросы параллельно
    Promise.all([
      fetchUser(),
      fetchSellers(),
      fetchRegions(),
      fetchCategories()
    ]).finally(() => {
      // Даем небольшую задержку для плавности (опционально)
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  // Эффект для фильтрации при изменении выбранных фильтров
  useEffect(() => {
    // Не фильтруем, пока данные не загружены
    if (loading) return;
    
    // Проверяем, что sellers - это массив
    if (!Array.isArray(sellers)) {
      console.warn('sellers не является массивом:', sellers);
      setFilteredSellers([]);
      return;
    }
    
    let result = [...sellers]; // Создаем копию массива
    
    if (selectedRegion) {
      result = result.filter(seller => 
        seller.region && seller.region.name === selectedRegion
      );
    }
    
    if (selectedCategory) {
      result = result.filter(seller => 
        seller.products && Array.isArray(seller.products) && 
        seller.products.some(product => 
          product.category && product.category.name === selectedCategory
        )
      );
    }
    
    setFilteredSellers(result);
  }, [selectedRegion, selectedCategory, sellers, loading]);

  // Функция для рендеринга контента
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Загрузка данных...</div>
        </div>
      );
    }

    return (
      <div className="sellers-container">
        {/* Блок фильтров */}
        <div className="sellers-filters-section">
          {/* Фильтр по региону */}
          <div className="filter-group">
            <label>Регион:</label>
            <select 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Все регионы</option>
              {Array.isArray(regions) && regions.map(region => (
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
              {Array.isArray(categories) && categories.map(category => (
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
          {Array.isArray(filteredSellers) && filteredSellers.length > 0 ? 
            filteredSellers.map(seller => (
              <Link 
                to={`/productsSeller/${seller.id}`} 
                key={seller.id}
                className="seller-card"
              >
                <div className="seller-name">{seller.username}</div>
                <div className="seller-region">{seller.region?.name}</div>
                <div className="seller-address">
                  {[seller.city, seller.street, seller.building]
                    .filter(Boolean)
                    .join(', ')}
                </div>
                <div className="seller-card-categories">
                  <div className="categories-label">Категории товаров:</div>
                  <div className="categories-vertical-list">
                    {seller.products && Array.isArray(seller.products) && seller.products.length > 0 ? (
                      [...new Set(
                        seller.products
                          .map(product => product.category?.name)
                          .filter(Boolean)
                      )].map((category, index) => (
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
            )
          }
        </div>
      </div>
    );
  };

  return (
    <div className="back">
      <Header/>
      
      {renderContent()}

      <div className="down-container fixed-element">
        <Link to={currentUser ? `/bucket` : '/login'}>
          <div className="wrapper-bucket bucket">
            <img src="/корзина.jpeg"/>
          </div>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

export default withRouter(Home);