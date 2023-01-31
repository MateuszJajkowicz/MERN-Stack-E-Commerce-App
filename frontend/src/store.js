import { configureStore } from '@reduxjs/toolkit';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducers = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
});

export default store;
