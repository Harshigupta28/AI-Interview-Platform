import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getAuthToken = (): string | null => {
    return localStorage.getItem("token");
};

export const setAuthToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
    localStorage.removeItem("token");
};

// Create Axios Instance
const api = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor to append Authorization JWT token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for cleaner error messages
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || "An error occurred during the API call";
        return Promise.reject(new Error(message));
    }
);

export default api;
