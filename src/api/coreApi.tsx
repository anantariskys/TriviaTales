import axios from 'axios';

const coreApi = axios.create({
  baseURL: 'https://opentdb.com/api.php'
});

export default coreApi;