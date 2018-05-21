import axios from 'axios';
import { Configs } from './actionConfigs';

export function userSendsMsg(msg) {
  return function (dispatch) {
    console.log(msg);
    axios
      .post('http://localhost:5000/msgsent', msg, Configs.CONFIG)
      .then((response) => {
        console.log('wit response', response);
        dispatch({ type: 'CHAT_RESPONSE', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}