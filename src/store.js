import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { toggleMenu } from './reducers/generalRecuer';
import { userSigninReducer } from './reducers/userReducer.js';
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListReducer,
} from './reducers/categoryReducer.js';
import {
  productCreateReducer,
  productDeleteReducer,
  productListReducer,
} from './reducers/productReducer.js';
import {
  computerCreateReducer,
  computerDeleteReducer,
  computerListReducer,
} from './reducers/computerReducer.js';
import {
  quotationCreateReducer,
  quotationDetailsReducer,
  quotationDeleteReducer,
  quotationListReducer,
  quotationReducer,
} from './reducers/quotationReducer.js';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  quotation: {
    items: localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items'))
      : [],
    clientData: localStorage.getItem('clientData')
      ? JSON.parse(localStorage.getItem('clientData'))
      : {},
  },
};

const reducer = combineReducers({
  toggle: toggleMenu,
  userSignin: userSigninReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  computerList: computerListReducer,
  computerCreate: computerCreateReducer,
  computerDelete: computerDeleteReducer,
  quotation: quotationReducer,
  quotationCreate: quotationCreateReducer,
  quotationList: quotationListReducer,
  quotationDelete: quotationDeleteReducer,
  quotationDetails: quotationDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
