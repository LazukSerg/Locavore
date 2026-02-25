import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Link, useParams, useNavigate, useLocation  } from 'react-router-dom';
import "./OrderInfo.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import "../components/AllProducts.css"
import Footer from "../components/Footer";
import orderService from "../services/order.service";

const API_URL = "http://localhost:8080/api/";

function OrderInfo() {

  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [statuses, setStatuses] = useState(['Новый', 'Подтверждён', 'Завершён', 'Отменён']);
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    
    const fetchUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user)
    } 

    const fetchOrder = async() => {
      try {
        const res = await orderService.getOrderById(id);
        setOrder(res.data);
        setProducts(res.data.products)
        setSeller(res.data.seller);
        setBuyer(res.data.buyer);
        setSelectedStatus(res.data.status);
      } catch (error) {
        console.error("Ошибка при загрузке заказа:", error);
        setError("Не удалось загрузить информацию о заказе");
      }
    } 
       
    fetchUser() 
    fetchOrder() 
      
  }, [id, selectedStatus]);

  const isBuyer = currentUser?.role === "ROLE_BUYER";
  const isSeller = currentUser?.role === "ROLE_SELLER";

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  // Функция для отмены заказа покупателем
  const handleCancelOrder = async () => {
    if (window.confirm('Вы уверены, что хотите отменить заказ?')) {
      setLoading(true);
      try {
        await orderService.updateOrderStatus(id, 'Отменён');
        setSelectedStatus('Отменён');
        setOrder({...order, status: 'Отменён'});
        alert('Заказ успешно отменён');
      } catch (error) {
        console.error("Ошибка при отмене заказа:", error);
        alert('Не удалось отменить заказ. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Функция для изменения статуса заказа продавцом
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    
    if (window.confirm(`Вы уверены, что хотите изменить статус заказа на "${newStatus}"?`)) {
      setLoading(true);
      try {
        await orderService.updateOrderStatus(id, newStatus);
        setSelectedStatus(newStatus);
        setOrder({...order, status: newStatus});
      } catch (error) {
        console.error("Ошибка при обновлении статуса:", error);
        alert('Не удалось обновить статус заказа. Пожалуйста, попробуйте позже.');
        // Возвращаем предыдущее значение в случае ошибки
        setSelectedStatus(order.status);
      } finally {
        setLoading(false);
      }
    } else {
      // Если пользователь отменил действие, возвращаем предыдущее значение
      setSelectedStatus(order.status);
    }
  };

  // Функция для рендера строк таблицы с продуктами
  const renderProductRows = () => {
    return products.map((product, index) => (
      <tr key={product.id || index}>
        <td className="order-info-table-background order-info-text-center">{index + 1}</td>
        <td className="order-info-table-background order-info-text-center">{product.title}</td>
        <td className="order-info-table-background order-info-text-center">{product.quantity}</td>
        <td className="order-info-table-background order-info-text-center">{product.price}</td>
      </tr>
    ));
  };

  // Вычисляем общую стоимость
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + ((product.price || 0) * (product.quantity || 0));
    }, 0);
  };

  // Проверка, можно ли отменить заказ (только если статус не "Отменён" и не "Завершён")
  const canCancelOrder = isBuyer && order?.status !== 'Отменён' && order?.status !== 'Завершён';

  if (error) {
    return (
      <div className="back">
        <Header/>
        <div className="error-message">{error}</div>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="back">
      <Header/>

      {order && (
        <div className="order-info-2">
           <div>
              <Link 
                to={`/orders/${currentUser.id}`} 
                className="back-to-orders-link"
              >← Вернуться к списку заказов
              </Link>
          </div>
          <div className="order-info-header">
            <div className="order-info-header-key">№ заказа</div>
            <div className="order-info-header-value">{order.id}</div>
            <div className="order-info-header-key">Дата заказа</div>
            <div className="order-info-header-value">{order.dateOfCreation}</div>
            <div className="order-info-header-key margin-left-auto">Стоимость заказа</div>
            <div className="order-info-header-value order-info-padding-35">
              {calculateTotalPrice()} ₽
            </div>
          </div>
          
          <table className="order-info-body">
            <thead> 
              <tr>
                <th className="order-info-user-col-1"></th>
                <th className="order-info-user-col-2"></th>
              </tr> 
            </thead>
            <tbody >
              <tr>
                <td className="order-info-text-center order-info-user-key">Продавец</td>
                <td className="order-info-text-center order-info-user-value">
                  {seller?.username}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Email продавца</td>
                <td className="order-info-text-center order-info-user-value">
                  {seller?.email}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Телефон продавца</td>
                <td className="order-info-text-center order-info-user-value">
                  {seller?.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Регион продавца</td>
                <td className="order-info-text-center order-info-user-value">
                  {seller?.region?.name}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Адрес продавца</td>
                <td className="order-info-text-center order-info-user-value">
                  {`${seller?.city}, ${seller?.street}, ${seller?.building}`}
                </td>
              </tr>
              <br/>
              <tr>
                <td className="order-info-text-center order-info-user-key">Клиент</td>
                <td className="order-info-text-center order-info-user-value">
                  {buyer?.username}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Email клиента</td>
                <td className="order-info-text-center order-info-user-value">
                  {buyer?.email}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Телефон клиента</td>
                <td className="order-info-text-center order-info-user-value">
                  {buyer?.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Дата самовывоза</td>
                <td className="order-info-text-center order-info-user-value">
                  {formatDate(order.dateOfPickUp)}
                </td>
              </tr>
              <tr>
                <td className="order-info-text-center order-info-user-key">Статус заказа</td>
                <td className="order-info-text-center order-info-user-value">
                  {isSeller ? (
                    <select 
                      value={selectedStatus} 
                      onChange={handleStatusChange}
                      disabled={loading}
                      className="status-select"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="order-info-body">
            <thead> 
              <tr>
                <th className="order-info-product-col-1 order-info-product-head">№</th>
                <th className="order-info-product-col-2 order-info-product-head">Товар</th>
                <th className="order-info-product-col-2 order-info-product-head">Количество</th>
                <th className="order-info-product-col-2 order-info-product-head">Цена</th>
              </tr> 
            </thead>
            <tbody>
              {renderProductRows()}
            </tbody>
          </table>

          {/* Кнопка отмены заказа для покупателя */}
          {canCancelOrder && (
            <div className="cancel-order-container">
              <button 
                onClick={handleCancelOrder}
                disabled={loading}
                className="cancel-order-button"
              >
                {loading ? 'Отмена...' : 'Отменить заказ'}
              </button>
            </div>
          )}
        </div>
      )}
      
      <Footer/>
    </div>
  );
}

export default withRouter(OrderInfo);