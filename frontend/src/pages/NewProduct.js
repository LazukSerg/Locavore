import '../components/base.css';
import './NewProduct.css';
import Header from '../components/header.component.js';
import AuthService from "../services/auth.service.js";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductService from '../services/product.service.js';
import regionService from '../services/region.service.js';
import categoryService from '../services/category.service.js';
import Footer from '../components/Footer.js';

function NewProduct() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    structure: '',
    price: '',
    image: null,
    imagePreview: '',
    certificate: null,
    certificateName: '',
    region: '',
    category: '',
    isLocal: false,
    seller: {
      id: ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthService.getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setFormData(prev => ({
          ...prev,
          seller: { id: user.id }
        }));
      }
    };
    
    const fetchRegions = async () => {
      setIsLoadingRegions(true);
      try {
        const res = await regionService.getAll();
        setTimeout(() => {
          setRegions(res.data);
          setIsLoadingRegions(false);
        }, 500);
      } catch (error) {
        console.error('Ошибка при загрузке регионов:', error);
        setIsLoadingRegions(false);
      }
    };

    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await categoryService.getAll();
        setCategories(res.data);
        setIsLoadingCategories(false);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        setIsLoadingCategories(false);
      }
    };
    
    getUser();
    fetchRegions();
    fetchCategories();
  }, []);

  useEffect(() => {
    // При изменении чекбокса isLocal или загрузке пользователя/регионов
    if (formData.isLocal && currentUser?.region && regions.length > 0) {
      // Находим ID региона по названию
      const regionId = getRegionIdByName(currentUser.region);
      // Устанавливаем регион продавца, если он есть в списке регионов
      const sellerRegionExists = regions.some(r => r.id === regionId);
      if (sellerRegionExists) {
        setFormData(prev => ({
          ...prev,
          region: regionId
        }));
      }
    }
  }, [formData.isLocal, currentUser, regions]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название товара обязательно';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание товара обязательно';
    }

    if (!formData.structure.trim()) {
      newErrors.structure = 'Состав товара обязателен';
    }

    if (!formData.price) {
      newErrors.price = 'Цена товара обязательна';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Введите корректную цену';
    }

    if (!formData.category) {
      newErrors.category = 'Выберите категорию товара';
    }

    if (!formData.image) {
      newErrors.image = 'Изображение товара обязательно';
    }

    if (!formData.region && !formData.isLocal) {
      newErrors.region = 'Выберите регион происхождения товара';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        // Если чекбокс выключен, сбрасываем регион
        region: checked ? prev.region : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Проверка типа файла
      if (!file.type.match(/image.*/)) {
        setErrors(prev => ({
          ...prev,
          image: 'Пожалуйста, выберите изображение'
        }));
        return;
      }

      // Проверка размера файла (не более 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Размер файла не должен превышать 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));

      // Очищаем ошибку
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: null
        }));
      }
    }
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Проверка типа файла (только PDF)
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          certificate: 'Пожалуйста, выберите PDF-файл'
        }));
        return;
      }

      // Проверка размера файла (не более 10MB для PDF)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          certificate: 'Размер файла не должен превышать 10MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        certificate: file,
        certificateName: file.name
      }));

      // Очищаем ошибку
      if (errors.certificate) {
        setErrors(prev => ({
          ...prev,
          certificate: null
        }));
      }
    }
  };

  const removeCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificate: null,
      certificateName: ''
    }));
    // Очищаем поле файла
    document.getElementById('certificate').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Создаем FormData для отправки файлов
      const formDataToSend = new FormData();
      
      // Добавляем все поля в FormData
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('structure', formData.structure);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('regionId', formData.region);
      formDataToSend.append('categoryId', formData.category);
      formDataToSend.append('isLocal', formData.isLocal);
      formDataToSend.append('sellerId', formData.seller.id);
      
      // Добавляем файл изображения
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Добавляем файл сертификата, если он есть
      if (formData.certificate) {
        formDataToSend.append('certificate', formData.certificate);
      }

      const response = await ProductService.createProduct(formDataToSend);
      
      if (response.data) {
        alert('Товар успешно добавлен!');
        navigate(`/product/${response.data.id}`);
      }
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
      alert('Произошла ошибка при добавлении товара. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Функция для получения ID региона по названию
const getRegionIdByName = (regionName) => {
  const region = regions.find(r => 
    r.name.toLowerCase().trim() === regionName.toLowerCase().trim()
  );
  
  return region.id
};

  return (
    <div className="back">
      <Header />
      {currentUser && (<div className='center'>
        <Link 
        to={`/showCatalog/${currentUser.id}`} 
        className="back-to-show-catalog-link"
        >← Вернуться к списку товаров
      </Link>
      </div>)}
      
      <div className="add-product-container">
        
        <h1 className="add-product-title">Добавление нового товара</h1>
        
        <form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
          <div className="add-product-form-group">
            <label htmlFor="title" className="add-product-label">
              Название товара *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`add-product-input ${errors.title ? 'error' : ''}`}
              placeholder="Введите название товара"
            />
            {errors.title && (
              <span className="add-product-error-message">{errors.title}</span>
            )}
          </div>

          <div className="add-product-form-row">
            <div className="add-product-form-group add-product-form-group-half">
              <label htmlFor="price" className="add-product-label">
                Цена (руб.) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`add-product-input ${errors.price ? 'error' : ''}`}
                placeholder="Введите цену"
                min="1"
                step="1"
              />
              {errors.price && (
                <span className="add-product-error-message">{errors.price}</span>
              )}
            </div>

            <div className="add-product-form-group add-product-form-group-half">
              <label htmlFor="category" className="add-product-label">
                Категория товара *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`add-product-select ${errors.category ? 'error' : ''}`}
                disabled={isLoadingCategories}
              >
                <option value="">
                  {isLoadingCategories ? 'Загрузка категорий...' : 'Выберите категорию'}
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="add-product-error-message">{errors.category}</span>
              )}
            </div>
          </div>

          <div className="add-product-form-group">
            <label htmlFor="description" className="add-product-label">
              Описание *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`add-product-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Введите описание товара"
              rows="4"
            />
            {errors.description && (
              <span className="add-product-error-message">{errors.description}</span>
            )}
          </div>

          <div className="add-product-form-group">
            <label htmlFor="structure" className="add-product-label">
              Состав *
            </label>
            <textarea
              id="structure"
              name="structure"
              value={formData.structure}
              onChange={handleChange}
              className={`add-product-textarea ${errors.structure ? 'error' : ''}`}
              placeholder="Введите состав товара"
              rows="3"
            />
            {errors.structure && (
              <span className="add-product-error-message">{errors.structure}</span>
            )}
          </div>

          <div className="add-product-checkbox-group">
            <label className="add-product-checkbox-label">
              <input
                type="checkbox"
                name="isLocal"
                checked={formData.isLocal}
                onChange={handleChange}
                className="add-product-checkbox"
              />
              <span className="add-product-checkbox-text">Локальный продукт</span>
            </label>
            {formData.isLocal && currentUser?.region && (
              <span className="add-product-checkbox-hint">
                Регион происхождения товара будет установлен автоматически
              </span>
            )}
          </div>

          <div className="add-product-form-group">
            <label htmlFor="region" className="add-product-label">
              Регион происхождения товара {!formData.isLocal && '*'}
            </label>
            {formData.isLocal ? (
              // Отображаем регион продавца в отдельном блоке, когда чекбокс включен
              <div className="add-product-region-display">
                <div className="add-product-region-info">
                  <span className="add-product-region-value">
                    {currentUser?.region}
                  </span>
                  <span className="add-product-region-badge">Локальный продукт</span>
                </div>
                {/* <input type="hidden" name="region" value={getRegionIdByName(currentUser?.region)} /> */}
              </div>
            ) : (
              // Отображаем селект, когда чекбокс выключен
              <>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={`add-product-select ${errors.region ? 'error' : ''}`}
                  disabled={isLoadingRegions}
                >
                  <option value="">
                    {isLoadingRegions ? 'Загрузка регионов...' : 'Выберите регион'}
                  </option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <span className="add-product-error-message">{errors.region}</span>
                )}
              </>
            )}
          </div>

          <div className="add-product-form-group">
            <label htmlFor="certificate" className="add-product-label">
              Сертификат соответствия (PDF)
            </label>
            <div className="add-product-file-upload">
              <input
                type="file"
                id="certificate"
                name="certificate"
                accept=".pdf,application/pdf"
                onChange={handleCertificateChange}
                className={`add-product-file-input ${errors.certificate ? 'error' : ''}`}
              />
              <label htmlFor="certificate" className="add-product-file-label">
                <span className="add-product-file-button">Выбрать сертификат</span>
                <span className="add-product-file-name">
                  {formData.certificateName || 'Файл не выбран'}
                </span>
              </label>
            </div>
            {errors.certificate && (
              <span className="add-product-error-message">{errors.certificate}</span>
            )}
            
            {formData.certificate && (
              <div className="add-product-certificate-info">
                <span className="add-product-certificate-name">
                  📄 {formData.certificateName}
                </span>
                <button 
                  type="button" 
                  onClick={removeCertificate}
                  className="add-product-certificate-remove"
                >
                  ×
                </button>
              </div>
            )}
            
            <span className="add-product-field-hint">
              Необязательное поле. Максимальный размер: 10MB
            </span>
          </div>

          <div className="add-product-form-group">
            <label htmlFor="image" className="add-product-label">
              Изображение товара *
            </label>
            <div className="add-product-file-upload">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={`add-product-file-input ${errors.image ? 'error' : ''}`}
              />
              <label htmlFor="image" className="add-product-file-label">
                <span className="add-product-file-button">Выбрать изображение</span>
                <span className="add-product-file-name">
                  {formData.image ? formData.image.name : 'Файл не выбран'}
                </span>
              </label>
            </div>
            {errors.image && (
              <span className="add-product-error-message">{errors.image}</span>
            )}
          </div>

          {formData.imagePreview && (
            <div className="add-product-image-preview">
              <p className="add-product-preview-title">Предпросмотр изображения:</p>
              <img 
                src={formData.imagePreview} 
                alt="Preview" 
                className="add-product-preview-image"
              />
            </div>
          )}

          <div className="add-product-buttons">
            <button 
              type="submit" 
              className="text add-product-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Добавление...' : 'Добавить товар'}
            </button>
            
            {currentUser && (<button 
              type="button" 
              className="text add-product-cancel-button"
              onClick={() => navigate(`/showCatalog/${currentUser.id}`)}
              disabled={isSubmitting}
            >
              Отмена
            </button>)}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NewProduct;