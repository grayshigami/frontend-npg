import router from "@/router";
import axios from "axios";
import { Promise } from "core-js";
import { ip_address } from "@/ipconst/ip-laptop";

const api = axios.create({
    baseURL: `http://${ip_address}:3002`
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
