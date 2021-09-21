import {
  COMPUTER_DELETE_FAIL,
  COMPUTER_DELETE_REQUEST,
  COMPUTER_DELETE_RESET,
  COMPUTER_DELETE_SUCCESS,
  COMPUTER_LIST_FAIL,
  COMPUTER_LIST_REQUEST,
  COMPUTER_LIST_SUCCESS,
  COMPUTER_CREATE_FAIL,
  COMPUTER_CREATE_REQUEST,
  COMPUTER_CREATE_SUCCESS,
  COMPUTER_CREATE_RESET,
} from '../constants/computerConstants';

export const computerListReducer = (state = { computers: [] }, action) => {
  switch (action.type) {
    case COMPUTER_LIST_REQUEST:
      return { loading: true };
    case COMPUTER_LIST_SUCCESS:
      return { loading: false, computers: action.payload };
    case COMPUTER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const computerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPUTER_CREATE_REQUEST:
      return { loading: true };
    case COMPUTER_CREATE_SUCCESS:
      return { loading: false, success: true };
    case COMPUTER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COMPUTER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const computerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPUTER_DELETE_REQUEST:
      return { loading: true };
    case COMPUTER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMPUTER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMPUTER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
