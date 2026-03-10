import '../components/base.css';
import './ProductInfo.css';
import Header from '../components/header.component.js';
import AuthService from "../services/auth.service.js";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductService from '../services/product.service.js';
import Footer from '../components/Footer.js';

function AdminProductInfo() {
  const [product, setProduct] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };
    
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    };    
    
    fetchProduct();
    getUser();
  }, [id]);



  // Функция для открытия сертификата в новой вкладке
  const openCertificate = () => {
    if (product.certificate) {
      window.open(product.certificate, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="back">
      <Header />
      {product && (
        <>
          <div className='product-info-flex'>
            <img className='product-info-image' src={product.image} alt={product.title} />
            
            <div className='product-info'>
              <p className='product-info-title'>{product.title}</p>
              
              <p className='product-info-subtitle'>Описание: <p className='product-info-description'>{product.description}</p></p>
            
              <p className='product-info-subtitle'>Состав: <p className='product-info-description'>{product.structure}</p></p>
              
              
              {/* Блок с сертификатом */}
              {product.certificate && (
                <div className='certificate-container'>
                  <span className='product-info-subtitle'>Сертификат соответствия</span>
                  <button 
                    onClick={openCertificate}
                    className='certificate-view-button'
                    title="Просмотреть сертификат"
                  >
                    <span className='certificate-icon'>📄</span>
                  </button>
                </div>
              )}

              <p className='product-info-subtitle'>{`Цена: ${product.price} руб.`}</p>
            </div>
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default AdminProductInfo;