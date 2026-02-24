import '../components/base.css';
import './ShoppingCart.css';
import Modal from 'react-modal';
import Header from '../components/header.component.js'
import OrderForm from '../components/OrderForm.js';
import React, { useState, useEffect} from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';
import Product from '../components/Product.js';
import { withRouter } from '../common/with-router.js';
import store from '../store.js';
import Footer from '../components/Footer.js';

function ShoppingCart() {

  // const navigate = useNavigate();
  const [products, setProducts] = useState(store.getState().cart);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const handleOrderComplete = () => {
  //   closeModal();  // Закрыть модальное окно в ShoppingCart
  //   // Можно также очистить корзину или перенаправить пользователя
  //   store.dispatch({ type: 'CLEAR_CART' });
  //       // Перенаправить на главную
  //       navigate('/home');
  // }

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
      {products?.[0]?.seller_id && (<OrderForm sellerId={products[0].seller_id}/>)}
      {/* {products?.[0]?.seller_id && (<OrderForm sellerId={products[0].seller_id} /*onClose={handleOrderComplete} />)} */}
      {/* <OrderForm sellerId={products[0].seller_id}/> */}
    </div>
  );
  

  store.subscribe(() => {
    setProducts(store.getState().cart)
  })

  useEffect(() => {
    const rqProducts = async() => {
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
    <div className={products ? 'back-for-basket' : 'back'}>
      <Header key = "a" />
      
      <div className='all-products-list'>
            {products && (getProducts(products))}
        
  
      </div>
      <div className='total-flex'>
          <div className='total'>Итого: {products && products.map(it => it.price * it.count).reduce((a,v) =>  a = a + v , 0 )}</div>
          <div className='button-cart-next button-back-green'>
            <div className='button-text' onClick={openModal}>Продолжить оформление</div>
            <Modal isOpen={modalIsOpen}>
                {modalContent}
            </Modal>
          </div>
        </div>
      <div className='button-next button-back button-back-yellow'>
          <Link  to={'/home'}>
            <div className='button-text'>Вернуться на главную страницу</div>
          </Link>
        </div>
        <Footer/>
     </div>
     
  );
}
export default withRouter(ShoppingCart);