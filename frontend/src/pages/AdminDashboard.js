import React, { Component, useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { useParams, Link } from 'react-router-dom';
import "./AdminDashboard.css"
import { withRouter } from '../common/with-router';
import Header from "../components/header.component";
import CategoryService from "../services/category.service";
import Category from "../components/Category"
import SellerProduct from "../components/SellerProduct";
import "../components/AllProducts.css";
import productService from "../services/product.service";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [localOnly, setLocalOnly] = useState(false);
  const [userType, setUserType] = useState('buyers'); // 'buyers' или 'sellers'
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blockingId, setBlockingId] = useState(null);

  useEffect(() => {
    const fetchBuyers = async() => {
      try {
        const res = await UserService.getAllBuyer();
        setBuyers(res.data || []);
      } catch (error) {
        console.error("Error fetching buyers:", error);
        setBuyers([]);
      }
    }
    
    const fetchSellers = async() => {
      try {
        const res = await UserService.getAllSellers();
        setSellers(res.data || []);
      } catch (error) {
        console.error("Error fetching sellers:", error);
        setSellers([]);
      }
    }
    
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
    }    
    
    getUser();
    fetchSellers();
    fetchBuyers();
  }, []);

  const handleBlockUser = async (userId, type) => {
    if (window.confirm('Вы уверены, что хотите заблокировать этого пользователя?')) {
      setBlockingId(userId);
      try {
        await UserService.blockUser(userId);
        
        // Обновляем состояние в зависимости от типа пользователя
        if (type === 'buyer') {
          const updatedBuyers = buyers.map(buyer => 
            buyer.id === userId ? { ...buyer, active: false } : buyer
          );
          setBuyers(updatedBuyers);
        } else {
          const updatedSellers = sellers.map(seller => 
            seller.id === userId ? { ...seller, active: false } : seller
          );
          setSellers(updatedSellers);
        }
        
        alert('Пользователь успешно заблокирован');
      } catch (error) {
        console.error("Error blocking user:", error);
        alert('Не удалось заблокировать пользователя');
      } finally {
        setBlockingId(null);
      }
    }
  };

  const handleUnblockUser = async (userId, type) => {
    if (window.confirm('Вы уверены, что хотите разблокировать этого пользователя?')) {
      setBlockingId(userId);
      try {
        await UserService.unblockUser(userId);
        
        // Обновляем состояние в зависимости от типа пользователя
        if (type === 'buyer') {
          const updatedBuyers = buyers.map(buyer => 
            buyer.id === userId ? { ...buyer, active: true } : buyer
          );
          setBuyers(updatedBuyers);
        } else {
          const updatedSellers = sellers.map(seller => 
            seller.id === userId ? { ...seller, active: true } : seller
          );
          setSellers(updatedSellers);
        }
        
        alert('Пользователь успешно разблокирован');
      } catch (error) {
        console.error("Error unblocking user:", error);
        alert('Не удалось разблокировать пользователя');
      } finally {
        setBlockingId(null);
      }
    }
  };

  const renderBuyers = () => {
    if (!buyers.length) {
      return <div className="no-users">Покупатели не найдены</div>;
    }

    return (
      <div className="users-grid">
        {buyers.map(buyer => (
          <div key={buyer.id} className={`user-card ${!buyer.active ? 'blocked' : ''}`}>
            <div className="user-info">
              <strong>{buyer.username || 'Без имени'}</strong>
              <div className="user-details">
                <span>ID: {buyer.id}</span>
                <span>Email: {buyer.email}</span>
                {buyer.phone && <span>Телефон: {buyer.phone}</span>}
                <span>Регион: {buyer.region?.name || 'Не указан'}</span>
                <span className={`status ${buyer.active ? 'active' : 'blocked'}`}>
                  Статус: {buyer.active ? 'Активен' : 'Заблокирован'}
                </span>
              </div>
            </div>
            <div className="user-actions">
              {buyer.active ? (
                <button 
                  onClick={() => handleBlockUser(buyer.id, 'buyer')}
                  disabled={blockingId === buyer.id}
                  className="block-btn"
                >
                  {blockingId === buyer.id ? 'Обработка...' : 'Заблокировать'}
                </button>
              ) : (
                <button 
                  onClick={() => handleUnblockUser(buyer.id, 'buyer')}
                  disabled={blockingId === buyer.id}
                  className="unblock-btn"
                >
                  {blockingId === buyer.id ? 'Обработка...' : 'Разблокировать'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSellers = () => {
    if (!sellers.length) {
      return <div className="no-users">Продавцы не найдены</div>;
    }

    return (
      <div className="users-grid">
        {sellers.map(seller => (
          <div key={seller.id} className={`user-card ${!seller.active ? 'blocked' : ''}`}>
            <div className="user-info">
              <Link to={`/admin/catalog/${seller.id}`} className="user-name-link">
                <strong>{seller.username || 'Без имени'}</strong>
              </Link>
              <div className="user-details">
                <span>ID: {seller.id}</span>
                <span>Email: {seller.email}</span>
                {seller.phone && <span>Телефон: {seller.phone}</span>}
                <span>Имя: {seller.firstName || 'Не указано'}</span>
                <span>Фамилия: {seller.lastName || 'Не указано'}</span>
                <span>Адрес: {`${seller?.region?.name || ''}, ${seller?.city || ''}, ${seller?.street || ''}, ${seller?.building || ''}`.replace(/^, |, $/g, '') || 'Не указан'}</span>
                <span className={`status ${seller.active ? 'active' : 'blocked'}`}>
                  Статус: {seller.active ? 'Активен' : 'Заблокирован'}
                </span>
              </div>
            </div>
            <div className="user-actions">
              {seller.active ? (
                <button 
                  onClick={() => handleBlockUser(seller.id, 'seller')}
                  disabled={blockingId === seller.id}
                  className="block-btn"
                >
                  {blockingId === seller.id ? 'Обработка...' : 'Заблокировать'}
                </button>
              ) : (
                <button 
                  onClick={() => handleUnblockUser(seller.id, 'seller')}
                  disabled={blockingId === seller.id}
                  className="unblock-btn"
                >
                  {blockingId === seller.id ? 'Обработка...' : 'Разблокировать'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="back">
      <Header/>
      
      <div className="admin-dashboard-content">
        <h2 className="center">Панель администратора</h2>
        
        {/* Фильтр для выбора типа пользователей */}
        <div className="user-type-filter">
          <button 
            className={`filter-btn ${userType === 'buyers' ? 'active' : ''}`}
            onClick={() => setUserType('buyers')}
          >
            Покупатели ({buyers.length})
          </button>
          <button 
            className={`filter-btn ${userType === 'sellers' ? 'active' : ''}`}
            onClick={() => setUserType('sellers')}
          >
            Продавцы ({sellers.length})
          </button>
        </div>

        {/* Отображение выбранного списка пользователей */}
        <div className="users-list-container">
          {userType === 'buyers' ? renderBuyers() : renderSellers()}
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default withRouter(AdminDashboard);