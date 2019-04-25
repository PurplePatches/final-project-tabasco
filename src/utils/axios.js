import axios from 'axios';

export default axios.create({
  xsrfCookieName: 'mytoken',
  xsrfHeaderName: 'csrf-token'
});