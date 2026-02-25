import './Product.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateCart, deleteFromCart, clearCart } from '../actions/cart-actions';

function Product(props) {
  const item = props.item;
  const dispatch = useDispatch(); // получаем доступ к диспетчеру редакса
  const cartItems = useSelector((state) => state.cart); // извлекаем корзину из редакса

  // находим текущий товар в корзине
  const cartItem = cartItems.find((c) => c.id === item.id);
  const [count, setCount] = useState(cartItem ? cartItem.count : 0);

  // обновляем состояние count при изменении корзины
  useEffect(() => {
    const newCartItem = cartItems.find((c) => c.id === item.id);
    setCount(newCartItem ? newCartItem.count : 0);
  }, [cartItems, item.id]);

  // функция для уменьшения количества товара
  const decrement = (item) => {
    if (count <= 0) return;
    if (count === 1) {
      dispatch(deleteFromCart(item.id)); // удаляем товар из корзины
    } else {
      dispatch(updateCart(item.id, item.title, count - 1, item.price, item.image, item.seller !== undefined ? item.seller.id : item.seller_id)); // уменьшаем количество
    }
  };

  // функция для увеличения количества товара
  const increment = (item) => {
    if (count === 0) {
      const hasDifferentSeller = cartItems.length > 0 && 
        cartItems.some(cartItem => cartItem.seller_id !== item.seller.id);

      if (hasDifferentSeller) {
        const userConfirmed = window.confirm(
          'В вашей корзине уже есть товары от другого продавца. Хотите очистить корзину и добавить товар от текущего продавца?'
        );

        if (userConfirmed) {
          dispatch(clearCart()); // очищаем корзину
          dispatch(addToCart(item.id, item.title, 1, item.price, item.image, item.seller.id)); // добавляем новый товар
        }
        // если пользователь отказался - ничего не делаем
        return;
      }

      dispatch(addToCart(item.id, item.title, 1, item.price, item.image, item.seller.id)); // добавляем новый товар
    } else {
      dispatch(updateCart(item.id, item.title, count + 1, item.price, item.image, item.seller !== undefined ? item.seller.id : item.seller_id)); // увеличиваем количество
    }
  };

    return (
       
    <React.Fragment>
        <div className='product'> 
                <Link to={{
                  pathname: `/product/${item.id}`
                }}>
                  <div className='image-container product-width'><img className='product-img' src={item.image} alt='изображение недоступно'></img></div>
                </Link>
                <div className='product-width'><p className='text'>{item.title}</p></div>
                {/* переделать на регион */}
                {/* <div className='product-padding'><p className='text'>{props.cart ? item.price : item.structure}</p></div> */}
                {props.cart == true && 
                  <React.Fragment>
                    <div className='align-center product-width'>
                        <div className='product-count-flex'>
                            <div onClick={() => decrement(item)}>
                                <img className='plus-padding-left' src='/minus.svg' ></img>
                            </div>
                            
                            <div className='product-count'>{count}</div>
                            <div onClick={() => increment(item)}>
                                <img className='plus-padding-right' src='/plus.svg' ></img>
                            </div>
                        </div>
                    </div>
                    <div><p className='text small-margin'>{count + ' * ' + item.price + ' = ' + item.price * count + ' руб.'}</p></div>
                    
                  </React.Fragment>
                } 
                {props.cart == false &&
                  <React.Fragment>
                    <div className='product-width'><p className='text small-margin'>{item.price}</p></div>
                    <div className='align-center product-width'>
                        <div className='product-count-flex'>
                            <div onClick={() => decrement(item)}>
                                <img className='plus-padding-left' src='/minus.svg' ></img>
                            </div>
                            
                            <div className='product-count'>{count}</div>
                            <div onClick={() => increment(item)}>
                                <img className='plus-padding-right'src='/plus.svg' ></img>
                            </div>
                        </div>
                    </div>
                  </React.Fragment>
                }
        </div>
    </React.Fragment>
        
     )
}

export default Product;