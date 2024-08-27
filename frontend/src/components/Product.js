import './Product.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import store from '../store.js';
import { addToCart, updateCart, deleteFromCart } from '../actions/cart-actions';
import ShoppingCart from './ShoppingCart.js';

function Product(props) {
    // const [visiableButton, setVisiableButton] = useState(false);
    // const [buttonText, setButtonText] = useState("Add to cart");

    const item = props.item
    const [count, setCount] = useState(store.getState().cart.find(x => x.id === item.id) === undefined ? 
                                          0 : store.getState().cart.find(x => x.id === item.id).count);


    let unsubscribe = store.subscribe(() => {
      setCount(store.getState().cart.find(x => x.id === item.id) === undefined ? 
                              0 : store.getState().cart.find(x => x.id === item.id).count)
    });

  function decrement(item) {
    if(count == 0) {
      return
    }
    if(count == 1) {
      deleteItem(item.id)
      // unsubscribe()
      return
    }
    store.dispatch(updateCart(item.id, item.title, count - 1, item.price, item.image))
    unsubscribe()
  }

  const increment = (item) => {
    if(count == 0) {
      store.dispatch(addToCart(item.id, item.title, 1, item.price, item.image))
      unsubscribe()
      return
    }
    store.dispatch(updateCart(item.id, item.title, count + 1, item.price, item.image))
    unsubscribe()
  }

  function deleteItem(id) {
    store.dispatch(deleteFromCart(id))
    // unsubscribe()
  }

    return (
       
    <React.Fragment>
        <tr className='product-row'>    
                <td className='product-width product-padding'><img className='product-img' src={item.image} alt='изображение недоступно'></img></td>
                <td className='product-width product-padding'><p className='text'>{item.title}</p></td>
                <td className='product-padding'><p className='text'>{props.cart ? item.price : item.structure}</p></td>
                {props.cart == true && 
                  <React.Fragment>
                    <td className='product-padding align-center'>
                        <div className='product-count-flex'>
                            <div onClick={() => decrement(item)}>
                                <img src='/minus.svg' ></img>
                            </div>
                            
                            <div className='product-count'>{count}</div>
                            <div onClick={() => increment(item)}>
                                <img src='/plus.svg' ></img>
                            </div>
                        </div>
                    </td>
                    <td className='product-padding'><p className='text small-margin'>{item.price * count}</p></td>
                    
                  </React.Fragment>
                } 
                {props.cart == false &&
                  <React.Fragment>
                    <td className='product-padding'><p className='text small-margin'>{item.price}</p></td>
                    <td className='product-padding align-center'>
                        <div className='product-count-flex'>
                            <div onClick={() => decrement(item)}>
                                <img src='/minus.svg' ></img>
                            </div>
                            
                            <div className='product-count'>{count}</div>
                            <div onClick={() => increment(item)}>
                                <img src='/plus.svg' ></img>
                            </div>
                        </div>
                    </td>
                  </React.Fragment>
                }
                {/* <td className='product-padding'><p className='text small-margin'>{item.price}</p></td>
                <td className='product-padding align-center'>
                    <div className='product-count-flex'>
                        <div onClick={() => decrement(item)}>
                            <img src='/minus.svg' ></img>
                        </div>
                        
                        <div className='product-count'>{count}</div>
                        <div onClick={() => increment(item)}>
                            <img src='/plus.svg' ></img>
                        </div>
                    </div>
                </td> */}
        </tr>
    </React.Fragment>
        
     )
}

export default Product;