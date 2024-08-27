export const ADD_TO_CART = 'ADD_TO_CART'; 
export const UPDATE_CART = 'UPDATE_CART'; 
export const DELETE_FROM_CART = 'DELETE_FROM_CART';

export function addToCart(id, title, count, price, image) { 
    return { type: ADD_TO_CART, payload: { id, title, count, price, image } } 
} 

export function updateCart(id, title, count, price, image) { 
    return { type: UPDATE_CART, payload: { id, title, count, price, image } } 
} 
    
export function deleteFromCart(id) { 
    return { type: DELETE_FROM_CART, payload: { id } } 
}