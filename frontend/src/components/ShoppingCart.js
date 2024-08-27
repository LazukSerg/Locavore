import './base.css';
import './ShoppingCart.css';
import Modal from 'react-modal';
import Header from './header.component'
import OrderForm from './OrderForm.js';
import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import Product from './Product';
import { withRouter } from '../common/with-router';
import store from '../store.js';

function ShoppingCart() {

  const [products, setProducts] = useState(store.getState().cart);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    console.log(modalIsOpen)
    setModalIsOpen(false);
    console.log(modalIsOpen)
  };

  const modalContent = (
    <div>
      <button className='modal-close' onClick={closeModal}>Закрыть</button>
      <OrderForm/>
    </div>
  );
  

  store.subscribe(() => {
    setProducts(store.getState().cart)
  })

  useEffect(() => {
    const rqProducts = async() => {
      console.log(store.getState().cart.length)
      const response = await store.getState().cart;
      setProducts(response)
    }
    rqProducts()
  }, [])

  const getProducts = products => {
    let content = [];
    for (let i = 0; i < products.length; i++) {
      const data = products[i]
      content.push(<Product key={data.id} item={data} cart={true}/>)
    }
    return content
  };


  return (
    <div style={{backgroundImage: "url(/background.png)" }} className="back">
      <Header key = "a" />
      
      <div className='products-container'>
        <table className='products-table'>
          <thead>
            <tr>
              <th className='product-header header-width-25' colSpan="2">ТОВАР</th>
              <th className='product-header'>ЦЕНА</th>
              <th className='product-header header-width-10'>КОЛИЧЕСТВО</th>
              <th className='product-header header-width-10'>ИТОГО</th>
            </tr>
          </thead>
          <tbody>
            {products && (getProducts(products))}
          </tbody>
          
        </table>
        <div className='total-flex'>
          <div className='total'>Итого: {products && products.map(it => it.price * it.count).reduce((a,v) =>  a = a + v , 0 )}</div>
          <div className='button-cart-next button-back-green'>
            <div className='button-text' onClick={openModal}>Продолжить оформление</div>
            <Modal isOpen={modalIsOpen}>
                {modalContent}
            </Modal>
          </div>
        </div>
  
      </div>
      <div className='button-next button-back button-back-yellow'>
          <Link  to={'/home'}>
            <div className='button-text'>Вернуться на главную страницу</div>
          </Link>
        </div>
     </div>
  );
}
export default withRouter(ShoppingCart);