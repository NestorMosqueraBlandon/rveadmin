import Axios from 'axios';
import {
  COMPUTER_LIST_FAIL,
  COMPUTER_LIST_REQUEST,
  COMPUTER_LIST_SUCCESS,
  COMPUTER_CREATE_FAIL,
  COMPUTER_CREATE_REQUEST,
  COMPUTER_CREATE_SUCCESS,
  COMPUTER_DELETE_FAIL,
  COMPUTER_DELETE_REQUEST,
  COMPUTER_DELETE_SUCCESS,
} from '../constants/computerConstants';

export const listComputers = () => async (dispatch, getState) => {
  dispatch({ type: COMPUTER_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      'https://rveapi.herokuapp.com/api/v1/computers/'
    );

    dispatch({ type: COMPUTER_LIST_SUCCESS, payload: data.computers });
  } catch (error) {
    dispatch({
      type: COMPUTER_LIST_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createComputer =
  (name, brand, category, image, price) => async (dispatch) => {
    dispatch({
      type: COMPUTER_CREATE_REQUEST,
      payload: { name, brand, category, image, price },
    });

    try {
      const { data } = await Axios.post(
        'https://rveapi.herokuapp.com/api/v1/computers/',
        { name, brand, category, image, price }
      );
      dispatch({ type: COMPUTER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COMPUTER_CREATE_FAIL, payload: message });
    }
  };

export const deleteComputer = (id) => async (dispatch, getState) => {
  dispatch({ type: COMPUTER_DELETE_REQUEST, payload: id });
  try {
    Axios.delete(`https://rveapi.herokuapp.com/api/v1/computers/${id}`);
    dispatch({ type: COMPUTER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: COMPUTER_DELETE_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
