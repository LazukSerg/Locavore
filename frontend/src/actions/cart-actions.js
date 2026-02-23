export const ADD_TO_CART = 'ADD_TO_CART'; 
export const UPDATE_CART = 'UPDATE_CART'; 
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export function addToCart(id, title, count, price, image, seller_id) { 
    return { type: ADD_TO_CART, payload: { id, title, count, price, image, seller_id } } 
} 

export function updateCart(id, title, count, price, image, seller_id) { 
    return { type: UPDATE_CART, payload: { id, title, count, price, image, seller_id } } 
} 
    
export function deleteFromCart(id) { 
    return { type: DELETE_FROM_CART, payload: { id } } 
}

export function clearCart() { 
    return { type: CLEAR_CART } 
}