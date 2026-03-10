import React, { Component, useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useParams, Link } from 'react-router-dom';
import "./AdminSellerCatalog.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import "../components/AllProducts.css";
import productService from "../services/product.service";
import Footer from "../components/Footer";
import AdminSellerProduct from "../components/AdminSellerProduct";

const API_URL = "http://localhost:8080/api/";

function AdminSellerCatalog() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchProducts = async() => {
      try {
        const res = await productService.getAllProducts(id);
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    } 
    getUser();
    fetchProducts();
  }, [id]);


  const getProducts = products => {
    if (!products || products.length === 0) {
      return <div className="no-results">Товары не найдены</div>;
    }
    
    let content = [];
    for (let i = 0; i < products.length; i++) {
      const data = products[i];
      content.push(<AdminSellerProduct 
        key={data.id} 
        item={data}
        onDelete={handleDeleteProduct}
        loading={loading}
        />);
    }
    return content;
  };

  const handleDeleteProduct = async (productId) => {
      if (window.confirm('Вы уверены, что хотите заблокировать этот товар?')) {
        setLoading(true);
        try {
          await productService.deleteProductById(productId);
          // Обновляем список продуктов после удаления
          const updatedProducts = products.filter(product => product.id !== productId);
          setProducts(updatedProducts);
        } catch (error) {
          console.error("Ошибка при блокировании товара:", error);
          alert('Не удалось заблокировать товар. Пожалуйста, попробуйте позже.');
        } finally {
          setLoading(false);
        }
      }
    };

  return (
    <div className="back">
      <Header/>
      <div className='all-products-list'>
        {products && getProducts(products)}
      </div>
      <Footer/>
    </div>
  );
}

export default withRouter(AdminSellerCatalog);