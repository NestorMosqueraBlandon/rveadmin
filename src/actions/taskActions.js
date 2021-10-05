import Axios from 'axios';
import {
  TASK_LIST_FAIL, 
  TASK_LIST_REQUEST, 
  TASK_LIST_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,

} from '../constants/taskConstants';


export const listTasks = () => async (dispatch, getState) => {
    dispatch({type: TASK_LIST_REQUEST});
    try{
        const {data} = await Axios.get('https://rveapi.herokuapp.com/api/v1/tasks/');
        dispatch({type: TASK_LIST_SUCCESS, payload: data.categories});
    }catch(error){
        
        dispatch({type: TASK_LIST_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, });
    }
}

export const createTask = (priority, title, description, peoples) => async(dispatch) => {
    dispatch({type: TASK_CREATE_REQUEST, payload: {priority, title, description, peoples}});
    
    try{
        const {data} = await Axios.post('https://rveapi.herokuapp.com/api/v1/tasks/', {priority, title, description, peoples});
        dispatch({type: TASK_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: TASK_CREATE_FAIL, payload: message});
    }
};


export const deleteCategory = (id) => async(dispatch, getState) => {
    dispatch({type: TASK_DELETE_REQUEST, payload: id});
    try{
        Axios.delete(`http://rveapi.herokuapp.com/api/v1/categories/${id}`);
        dispatch({type: TASK_DELETE_SUCCESS})
    }catch(error){
        dispatch({type: TASK_DELETE_FAIL, payload: error.message && error.response.data.message? error.response.data.message : error.message, })
    }
};
