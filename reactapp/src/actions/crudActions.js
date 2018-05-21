import axios from 'axios';
import { Configs } from './actionConfigs';

export function fetch_TodoList() {
  return function (dispatch) {
    axios
      .get('http://localhost:5000/todolist', Configs.CONFIG)
      .then((response) => {
        dispatch({ type: 'FETCH_TODOLIST', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function add_todolist(addData) {
  return function (dispatch) {
    console.log(addData);
    axios
      .post('http://localhost:5000/todolist/add', addData, Configs.CONFIG)
      .then((response) => {
        dispatch({ type: 'ADD_TOTODO', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function del_todolist(delData) {
  return function (dispatch) {
    console.log(delData);
    axios
      .post('http://localhost:5000/todolist/del', delData, Configs.CONFIG)
      dispatch({ type: 'DEL_TOTODO', payload: delData });
  }
}