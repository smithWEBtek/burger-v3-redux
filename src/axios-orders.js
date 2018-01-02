import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://swt-burger.firebaseio.com'
})

export default instance;
