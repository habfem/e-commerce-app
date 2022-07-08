import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const initialState = {}

const middleware = [thunk]

const store = configureStore({ reducer: reducer }, initialState, composeWithDevTools, applyMiddleware(...middleware))

export default store