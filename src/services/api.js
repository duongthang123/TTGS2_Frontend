import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Accept": "application/json",
    },
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

api.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        const statusCode = error?.response.data.status;
        const url = error?.config?.url;

        if (statusCode === 401 && url !== "/login") {
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
)

export default api;