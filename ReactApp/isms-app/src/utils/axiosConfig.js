import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:2507' //Để tạm đây bao giờ có API thì tính
});

export default request;