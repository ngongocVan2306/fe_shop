"use server";

import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

instance.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (config: any) => {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${
                cookies().get("access_token")?.value
                    ? cookies().get("access_token")?.value
                    : cookies().get("refresh_token")?.value
            }`,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        console.error("API error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default instance;
