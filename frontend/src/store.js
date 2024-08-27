import { createStore } from "redux"; 
import reducer from './reducers/cart-reducer'; 

let store = createStore(reducer); 
export default store; 