import axios from 'axios';

axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:4000/api';
