import { createStore } from "redux"; 
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducers/cart-reducer'; 

const store = createStore(
  reducer,
  composeWithDevTools(
    // applyMiddleware(...middleware) // если есть middleware
  ))
  
export default store; 