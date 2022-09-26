import axios from 'axios';

axios.defaults.headers.common['accept'] = 'application/json';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
