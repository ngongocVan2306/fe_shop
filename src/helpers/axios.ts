import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Thrown error for request with OK status code
        // const { data } = response;
        // return data;
        return response.data;
    },
    (error) => {
        console.error("API error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default instance;
