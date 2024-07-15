import router from "@/router";
import axios from "axios";
import { Promise } from "core-js";

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            router.push({ name: '/auth/login' });
        }

        return Promise.reject(error);
    }
);

export default api
