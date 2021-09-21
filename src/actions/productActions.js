import Axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from '../constants/productConstants';

export const listProducts = (page) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `https://rveapi.herokuapp.com/api/v1/products?page=${page}`
    );

    console.log(data);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct =
  (name, brand, category, image, price) => async (dispatch) => {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
      payload: { name, brand, category, image, price },
    });

    try {
      const { data } = await Axios.post(
        'https://rveapi.herokuapp.com/api/v1/products/',
        { name, brand, category, image, price }
      );
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
  };

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });
  try {
    Axios.delete(`https://rveapi.herokuapp.com/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
