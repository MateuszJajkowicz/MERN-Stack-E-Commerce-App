import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';

const reducers = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
};

const initialState = {};

const middlewere = [thunk];

const store = configureStore({
  reducer: reducers,
  middleware: middlewere,
  initialState,
});

export default store;
