"use server";

import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { resStatus } from "@/constants";
import { handleLogoutAction, handleRefreshToken } from "@/action/authAction";

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
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === resStatus.UNAUTHORIZED) {
            try {
                await handleRefreshToken();
                return instance(originalRequest);
            } catch (refreshError) {
                console.error("Lỗi làm mới token:", refreshError);
                await handleLogout(refreshError);
            }
        } else {
            console.error("API error:", error.response?.data || error.message);
            return Promise.reject(error);
        }
    }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleLogout(refreshError: any) {
    handleLogoutAction();
    return Promise.reject(refreshError);
}

export default instance;
