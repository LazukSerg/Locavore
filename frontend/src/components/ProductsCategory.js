import './base.css';
import './ProductsCategory.css';
import Header from './header.component'
import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryService from "../services/category.service";
import AuthService from "../services/auth.service";
import Product from './Product';
import { withRouter } from '../common/with-router';

function ProductsCategory() {

  const [products, setProducts] = useState('');
  const [categories, setCategories] = useState('');
  var [selected, setSelected] = useState('')
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const getUser = async() => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user)
    }    
    getUser()
  }, [])

  useEffect(() => {
    const rqProducts = async() => {
      const response = await CategoryService.getProductsByCategoryId(id);
      setProducts(response.data)
    }
    const rqCategories = async() => {
      const response = await CategoryService.getAll();
      setCategories(response.data)
    }
    rqProducts()
    rqCategories()
  }, [id])


  const getProducts = products => {
    let content = [];
    for (let i = 0; i < products.length; i++) {
      const data = products[i]
      content.push(<Product key={data.id} item={data} cart={false}/>)
    }
    return content
  };

  const getCategories = categories => {
    let content = [];
    for (let i = 0; i < categories.length; i++) {
      const data = categories[i]
      content.push(
        <React.Fragment key={data.id}>
          <Link to={`/category/${data.id}`}>
          < div className='category-link'>
              <div className='link-container'>
                <h3 className='new-line'>{(data.name).replace(" ",'\n')}</h3>
              </div>
            </div>
          </Link>
         </React.Fragment>
        
      )
    }
    return content
  };



  


  return (
    <div style={{backgroundImage: "url(/background.png)" }} className="back">
      <Header key = "a" />
      <div className='row-categories'>
        {categories && (getCategories(categories))}
      </div>
      <div className='products-container'>
        <table className='products-table'>
          <thead>
            <tr>
              <th className='product-header header-width-25' colSpan="2">ТОВАР</th>
              <th className='product-header'>СОСТАВ</th>
              <th className='product-header header-width-10'>ЦЕНА</th>
              <th className='product-header header-width-10'>КОЛИЧЕСТВО</th>
            </tr>
          </thead>
          <tbody>
            {products && (getProducts(products))}
          </tbody>
          
        </table>
        <div className='button-next button-back-green'>
          <Link  to={currentUser == null ? `/login` : `/bucket`}>
            <div className='button-text'>Перейти в корзину</div>
          </Link>
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
export default withRouter(ProductsCategory);