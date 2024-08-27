// import "./Form.css"
import "./OrderForm.css"
import { useForm } from "react-hook-form"
import React, { useState, useEffect} from 'react';
import store from '../store.js';
import AuthService from "../services/auth.service";
import userService from "../services/user.service.js";

function OrderForm(props) {

    const [products, setProducts] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const getUser = async() => {
            const user = await AuthService.getCurrentUser();
            const fullUser = await userService.getById(user["id"]);
            setCurrentUser(fullUser.data)
        }
        getUser()
    }, [])

    useEffect(() => {
        const rqProducts = async() => {
          const response = await store.getState().cart;
          setProducts(response)
        }
        rqProducts()
    }, [])

    const getProd = products => {
        let content = [];
        for (let i = 0; i < products.length; i++) {
          const element = products[i]
          content.push(
            <React.Fragment>
                <tr>
                    <td></td>
                    <td className="order-form-user-value text-align">{element["title"]}</td>
                    <td className="text-align">{element["count"]}</td>
                    <td className="text-align">{element["price"] * element["count"]}</td>

                </tr>
            </React.Fragment>
            
          )
        }
        return content
      };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm()


    const onSubmit = async(data) => {
        console.log(JSON.stringify(data))


        // const count = store.getState().cart.map(item => item.quantity).reduce((acc, quantity) => acc + quantity)
        // const total = store.getState().cart.map(item => item.quantity * (item.discont_price ? item.discont_price : item.price)).reduce((acc, quantity) => acc + quantity)

        // data.count = count
        // data.total = total
        // data.productIds = store.getState().cart.map(item => item.id)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:8080/order/send', requestOptions);
        const rs = await response.json();
    }


    return (
        <form className="order-form-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="order-form-header">
                <div className="order-form-header-key">№ заказа</div>
                <div className="order-form-header-value">Номер будет присвоен после создания заказа</div>
                <div className="order-form-header-key">Дата заказа</div>
                <div className="order-form-header-value" {...register("date", { required: false })}>{new Date().toLocaleDateString()}</div>
            </div>
            <div className="order-form-header">
                <div className="order-form-header-key">Количество позиций</div>
                <div className="order-form-header-value order-form-padding-35" {...register("Count", { required: false })}>{products && products.map(it => it.count).reduce((a,v) => a = a + v, 0)}</div>
                <div className="order-form-header-key margin-left-auto">Стоимость заказа</div>
                <div className="order-form-header-value order-form-padding-35" {...register("Total", { required: false })}>{products && products.map(it => it.price * it.count).reduce((a,v) =>  a = a + v , 0 )}</div>
            </div>
            <table className="order-form-body">
                <thead> 
                    <tr>
                        <th className="order-form-user-col-1"></th>
                        <th className="order-form-user-col-2"></th>
                    </tr> 
                 </thead>
                <tbody>
                    <tr>
                        <td className="order-form-text-center order-form-user-key">Клиент</td>
                        <td className="order-form-text-center order-form-user-value" {...register("date-pickup", { required: false })}>{currentUser && currentUser["username"]}</td>
                    </tr>
                    <tr>
                        <td className="order-form-text-center order-form-user-key">Эл. почта</td>
                        <td className="order-form-text-center order-form-user-value" {...register("date-pickup", { required: false })}>{currentUser && currentUser["email"]}</td>
                    </tr>
                    <tr>
                        <td className="order-form-text-center order-form-user-key">Моб. телефон</td>
                        <td className="order-form-text-center order-form-user-value" {...register("date-pickup", { required: false })}>{currentUser && currentUser["phoneNumber"]}</td>
                    </tr>
                    <tr>
                        <td className="order-form-text-center order-form-user-key">Дата самовывоза</td>
                        <td><input className="order-form-text-center order-form-user-value" placeholder="Дата" {...register("date-pickup", { required: true })} /></td>
                    </tr>
                </tbody>
            
            </table>

            <table className="order-form-body" /*className='products-table'*/>
                <thead> 
                    <tr>
                        <th className="order-form-product-col-1 order-form-product-head">Заказанная продукция</th>
                        <th className="order-form-product-col-2 order-form-product-head">Товар</th>
                        <th className="order-form-product-col-2 order-form-product-head">Количество</th>
                        <th className="order-form-product-col-2 order-form-product-head">Цена</th>
                    </tr> 
                 </thead>
                <tbody>
                    {products && getProd(products)}
                </tbody>
            </table>
            <input value={"Создать заказ"} type="submit" />
            
            {/* <a className="order-header">Order details</a>
            <a className="count">{store.getState().cart.map(item => item.quantity).reduce((acc, quantity) => acc + quantity)} items</a>
            <div className="total-flex">
                <a className="total">Total</a>
                <a className="total-value">{store.getState().cart.map(item => item.quantity * (item.discont_price ? item.discont_price : item.price)).reduce((acc, quantity) => acc + quantity)}</a>
            </div>
            <input className="btn-card form-border color" placeholder="Name" {...register("name", { required: true })} />
            <input className="btn-card form-border color" placeholder="Phone Number" {...register("phone", { required: true })} />
            <input className="btn-card form-border color" placeholder="Email" {...register("email", { required: true })} />

            {errors.exampleRequired && <span>This field is required</span>}
    
            <input className={`button ${discountColor}`} value={discountText} type="submit" /> */}
        </form>
      )
}

export default OrderForm;