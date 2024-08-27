import { ADD_TO_CART, UPDATE_CART, DELETE_FROM_CART } from '../actions/cart-actions';

const initialState = { cart: [] } 

export default function(state=initialState, action) { 
    switch (action.type) { 
        case ADD_TO_CART: { 
            return { ...state, cart: [...state.cart, action.payload] }
        }
        case UPDATE_CART: { 
            return { ...state, cart: state.cart.map(item => item.id === action.payload.id ? action.payload : item) } 
        }
        case DELETE_FROM_CART: { 
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) } 
        } 
        default: 
            return state; 
    } 
} 