import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { useParams, Link } from 'react-router-dom';
// import "./ProductsSeller.css"
import "./ShowCatalog.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import CategoryService from "../services/category.service";
import Category from "../components/Category"
import SellerProduct from "../components/SellerProduct";
import "../components/AllProducts.css";
import productService from "../services/product.service";
import Footer from "../components/Footer";

function ShowCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [localOnly, setLocalOnly] = useState(false); // чекбокс: true - только local, false - все
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const res = await CategoryService.getAll();
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    }
    
    const fetchProducts = async() => {
      try {
        const res = await productService.getAllProducts(id);
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    }
    
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    }    
    
    getUser();
    fetchProducts();
    fetchCategories();
  }, [id]);

  // Применение фильтров
  useEffect(() => {
    let filtered = [...products];
    
    // Фильтр по категории
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category?.name === selectedCategory
      );
    }
    
    // Фильтр по флагу local (чекбокс)
    if (localOnly) {
      filtered = filtered.filter(product => product.local === true);
    }
    // Если localOnly = false, показываем все товары (без фильтрации по local)
    
    setFilteredProducts(filtered);
  }, [selectedCategory, localOnly, products]);

  const getProducts = products => {
    if (!products || products.length === 0) {
      return <div className="no-results">Товары не найдены</div>;
    }
    
    let content = [];
    for (let i = 0; i < products.length; i++) {
      const data = products[i];
      content.push(<SellerProduct 
        key={data.id} 
        item={data}
        onDelete={handleDeleteProduct}
        loading={loading}
        />);
    }
    return content;
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setLocalOnly(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      setLoading(true);
      try {
        await productService.deleteProduct(productId);
        // Обновляем список продуктов после удаления
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts.filter(product => {
          let matches = true;
          if (selectedCategory) {
            matches = matches && product.category?.name === selectedCategory;
          }
          if (localOnly) {
            matches = matches && product.local === true;
          }
          return matches;
        }));
      } catch (error) {
        console.error("Ошибка при удалении товара:", error);
        alert('Не удалось удалить товар. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    }
  };

  

  return (
    <div className="back">
      <Header/>

      <div className="products-seller-filters-section">

        <div className="filter-group">
          <label>Категория:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Все категории</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={localOnly}
              onChange={(e) => setLocalOnly(e.target.checked)}
            />
            <span>Только локальные товары</span>
          </label>
        </div>

        <button 
          onClick={resetFilters}
          className="reset-filters-btn"
        >
          Сбросить фильтры
        </button>
        <Link 
            to={`/createProduct`} 
            className="reset-filters-btn"
          >
            + Добавить новый товар
          </Link>
      </div>

      {/* Список товаров */}
      <div className='all-products-list'>
        {filteredProducts && getProducts(filteredProducts)}
      </div>
      <Footer/>
    </div>
  );
}

export default withRouter(ShowCatalog);