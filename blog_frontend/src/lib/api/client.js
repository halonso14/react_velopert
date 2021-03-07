import axios from 'axios';

const client = axios.create();

// client.defaults.baseURL = 'https://external-api-server.com';
// client.defaults.headers.common['Authorization'] = 'Bearer toekn';

export default client;