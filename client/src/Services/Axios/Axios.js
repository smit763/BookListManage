import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;