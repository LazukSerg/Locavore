import '../components/base.css';
import './ProductInfo.css';
import Header from '../components/header.component.js';
import AuthService from "../services/auth.service.js";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart, deleteFromCart, clearCart } from '../actions/cart-actions.js';
import ProductService from '../services/product.service.js';
import Footer from '../components/Footer.js';

function ProductInfo() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [count, setCount] = useState(0);
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

  // обновляем состояние count при изменении корзины
  useEffect(() => {
    if (product?.id) {
      const newCartItem = cartItems.find((c) => c.id === product.id);
      setCount(newCartItem ? newCartItem.count : 0);
    }
  }, [cartItems, product]);

  // функция для уменьшения количества товара
  const decrement = () => {
    if (count <= 0 || !product) return;
    if (count === 1) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(updateCart(product.id, product.title, count - 1, product.price, product.image, product.seller?.id));
    }
  };

  // функция для увеличения количества товара
  const increment = () => {
    if (!product) return;
    
    if (count === 0) {
      const hasDifferentSeller = cartItems.length > 0 && 
              cartItems.some(cartItem => cartItem.seller_id !== product.seller?.id);
      
      if (hasDifferentSeller) {
        const userConfirmed = window.confirm(
          'В вашей корзине уже есть товары от другого продавца. Хотите очистить корзину и добавить товар от текущего продавца?'
        );
        
        if (userConfirmed) {
          dispatch(clearCart());
          dispatch(addToCart(product.id, product.title, 1, product.price, product.image, product.seller?.id));
        }
        return;
      }
      
      dispatch(addToCart(product.id, product.title, 1, product.price, product.image, product.seller?.id));
    } else {
      dispatch(updateCart(product.id, product.title, count + 1, product.price, product.image, product.seller?.id));
    }
  };

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
              
              <div className='product-info-count-flex'>
                <div className='product-count-flex'>
                  <div onClick={decrement} className='count-control'>
                    <img src='/minus.svg' alt='уменьшить' />
                  </div>
                  
                  <div className='product-count'>{count}</div>
                  
                  <div onClick={increment} className='count-control'>
                    <img src='/plus.svg' alt='увеличить' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className='bucket-flex'>
        <Link className='back-link' to={'/home'}>Вернуться на главную страницу</Link>
        <Link to={currentUser ? `/bucket` : '/login'}>
          <div className="wrapper-bucket bucket">
            <img src="/корзина.jpeg" alt="Корзина" />
          </div>
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}

export default ProductInfo;