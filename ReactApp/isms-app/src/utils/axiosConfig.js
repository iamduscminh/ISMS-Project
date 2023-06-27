import axios from 'axios';
const BASE_URL = 'https://localhost:7134';

export default axios.create({
    baseURL: BASE_URL //Để tạm đây bao giờ có API thì tính
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})