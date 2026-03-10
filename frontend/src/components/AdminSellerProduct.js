import './SellerProduct.css';
import { Link } from 'react-router-dom';
import React from 'react';

function AdminSellerProduct(props) {
  const item = props.item;
  const onDelete = props.onDelete;
  const loading = props.loading;

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    if (onDelete) {
      onDelete(item.id);
    }
  };

    return (
       
    <React.Fragment>
        <div className='product'> 
                <Link to={{
                  pathname: `/admin/infoProduct/${item.id}`
                }}>
                  <div className='image-container product-width'><img className='product-img' src={item.image} alt='изображение недоступно'></img></div>
                </Link>
                <div className='product-width'><p className='text'>{item.title}</p></div>
                <div className='product-widt text'>{item.price} руб.</div>
                <button 
                  onClick={handleDeleteClick}
                  className="delete-product-button-in-card"
                  disabled={loading}
                  title="Заблокировать товар"
                >
                  {loading ? 'Блокирование...' : 'Заблокировать товар'}
                </button>
        </div>
    </React.Fragment>
        
     )
}

export default AdminSellerProduct;