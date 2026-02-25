import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link, useParams, useNavigate, useLocation  } from 'react-router-dom';
import "./MyOrders.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import "../components/AllProducts.css"
import Footer from "../components/Footer";
import orderService from "../services/order.service";

const API_URL = "http://localhost:8080/api/";

function MyOrders() {

  // const location = useLocation();
  const [orders, setOrders] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [statuses, setStatuses] = useState(['Новый', 'Подтверждён', 'Завершён', 'Отменён']);
  const { id } = useParams();

  useEffect(() => {
    
    const fetchUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user)
    } 
    // const fetchOrders = async() => {
    //   const res = await orderService.getOrdersByUser(id);
    //   setOrders(res.data)
    //   setFilteredOrders(res.data)
    // }
       
    fetchUser()
    // fetchOrders()
    
      
  }, [])

  useEffect(() => {
  const fetchOrders = async () => {
    // Этот useEffect сработает только когда currentUser изменится с null/undefined на реальное значение
    if (currentUser?.role) {
      const res = await orderService.getOrdersByUser(currentUser.role, id);
      setOrders(res.data);
      setFilteredOrders(res.data);
    }
  };
  
  fetchOrders();
  // Проверяем, пришли ли мы после обновления заказа
    // if (location.state?.orderUpdated) {
    //   // Можно показать уведомление
    //   console.log(`Заказ ${location.state.orderId} обновлен на статус: ${location.state.newStatus}`);
      
    //   // Очищаем состояние
    //   window.history.replaceState({}, document.title);
    // }
}, [currentUser, id]);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredOrders, setFilteredOrders] = useState('');

  // Эффект для фильтрации при изменении выбранных фильтров
  useEffect(() => {
    let result = orders;
    
    if (selectedStatus) {
      result = result.filter(order => order.status === selectedStatus);
    }
  
    
    setFilteredOrders(result);
  }, [selectedStatus, orders]);

  const isBuyer = currentUser?.role === "ROLE_BUYER";

  return (
    
    <div className="back">
      <Header/>

        <div className="orders-container">
          {/* Блок фильтров */}
          <div className="orders-filters-section">

            {/* Фильтр по региону */}
            <div className="filter-group">
              <label>Статус заказа:</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Все статусы</option>
                {statuses && statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
              
            {/* Кнопка сброса фильтров */}
            <button 
              onClick={() => {
                setSelectedStatus('');
              }}
              className="reset-filters-btn"
            >
              Сбросить фильтры
            </button>
          </div>
            
          {/* Список отфильтрованных заказов */}
          <div className="orders-list">
          {filteredOrders.length > 0 ? filteredOrders.map(order => (
            <div key={order.id} className="order-card-wrapper">
              <Link 
                to={`/orderInfo/${order.id}`} 
                key={order.id}
                // className="order-card"
                className={`order-card ${order.status === 'Отменён' ? 'order-card-color-cancelled' : 'order-card-color'}`}
              >
                <div>{`Номер заказа: ${order.id}`}</div>
                {currentUser.role == "ROLE_BUYER" && (<div>{`Продавец: ${order.sellerUserName}`}</div>)}
                {currentUser.role == "ROLE_SELLER" && (<div>{`Покупатель: ${order.buyerUserName}`}</div>)}
                <div>{`Дата создания: ${order.dateOfCreation}`}</div>
                <div>{`Дата самовывоза: ${order.dateOfPickUp}`}</div>
                <div>{`Сумма: ${order.totalOrder}`}</div>
                <div>{`Статус: ${order.status}`}</div>

              </Link>
              </div>
              )) : (
                <div className="no-results">Заказы не найдены</div>
              )}
          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default withRouter(MyOrders);
