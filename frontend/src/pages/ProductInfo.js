import '../components/base.css';
import './ProductInfo.css';
import Header from '../components/header.component.js';
import AuthService from "../services/auth.service.js";
// import Footer from '../footer';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Импортируем хуки Redux
import store from '../store.js';
import { addToCart, updateCart, deleteFromCart, clearCart } from '../actions/cart-actions.js';
import ProductService from '../services/product.service.js';
import Footer from '../components/Footer.js';


function ProductInfo() {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const cartItem = null;
  const [count, setCount] = useState(0);

  const [product, setProduct] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [price, setPrice] = useState('');
  const [price_class, setPrice_class] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
        const response = await ProductService.getProductById(id);
        setProduct(response.data);
    };
    const getUser = async() => {
          const user = await AuthService.getCurrentUser();
          setCurrentUser(user)
    };    
    fetchProduct();
    getUser();
  }, [id]);

  // обновляем состояние count при изменении корзины
    useEffect(() => {
      const newCartItem = cartItems.find((c) => c.id === product.id);
      setCount(newCartItem ? newCartItem.count : 0);
    }, [cartItems, product.id]);
  
    // функция для уменьшения количества товара
    const decrement = () => {
      if (count <= 0) return;
      if (count === 1) {
        dispatch(deleteFromCart(product.id)); // удаляем товар из корзины
      } else {
        dispatch(updateCart(product.id, product.title, count - 1, product.price, product.image, product.seller.id)); // уменьшаем количество
      }
    };
  
    // функция для увеличения количества товара
    const increment = () => {
      if (count === 0) {
        const hasDifferentSeller = cartItems.length > 0 && 
                cartItems.some(cartItem => cartItem.seller_id !== product.seller.id);
        
              if (hasDifferentSeller) {
                const userConfirmed = window.confirm(
                  'В вашей корзине уже есть товары от другого продавца. Хотите очистить корзину и добавить товар от текущего продавца?'
                );
        
                if (userConfirmed) {
                  dispatch(clearCart()); // очищаем корзину
                  dispatch(addToCart(product.id, product.title, 1, product.price, product.image, product.seller.id)); // добавляем новый товар
                }
                // если пользователь отказался - ничего не делаем
                return;
              }
        
        dispatch(addToCart(product.id, product.title, 1, product.price, product.image, product.seller.id)); // добавляем новый товар
      } else {
        dispatch(updateCart(product.id, product.title, count + 1, product.price, product.image, product.seller.id)); // увеличиваем количество
      }
    };


  return (
    <div className="back">
      <Header />
      {product && (
        <div className='product-info-flex'>
          <img className='product-info-image' src={product.image}></img>
          <div className='product-info'>
            <p className='product-info-title'>{product.title}</p>
            <p className='product-info-subtitle'>Описание:</p>
            <p className='product-info-description'>{product.description}</p>
            <p className='product-info-subtitle'>Состав:</p>
            <p className='product-info-description'>{product.structure}</p>
            <p className='product-info-subtitle'>{`Цена: ${product.price} руб.`}</p>
            <div className='product-info-price-flex'>
                    <a className={price_class}>{price}</a>
            </div>
            <div className='product-info-count-flex'>
                  <div className='product-count-flex'>
                    <div onClick={decrement}>
                      <img src='/minus.svg' ></img>
                    </div>
                    
                    <div className='product-count'>{count}</div>
                    <div onClick={increment}>
                      <img src='/plus.svg' ></img>
                    </div>
                    
                  </div>
            </div>
            
          </div>
        </div>
              
      )}
      <div className='bucket-flex'>
        <Link className='back-link' to={'/home'}>Вернуться на главную страницу</Link>
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


export default ProductInfo;
