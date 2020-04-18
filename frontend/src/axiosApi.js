import axios from 'axios';
import store from './store/configureStore'

 const axiosApi = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosApi.interceptors.request.use(config => {
    try {

        config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;

    } catch (e) {
        // do nothing, no token exists
    }
    return config;
});
export  default  axiosApi;