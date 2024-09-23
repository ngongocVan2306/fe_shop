"use server";

import { resStatus } from "@/constants";
import { handleLogoutAction, handleRefreshToken } from "./authAction";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function HandleApi(api: any, data: any = null) {
    try {
        return await api(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.response.status === resStatus.UNAUTHORIZED) {
            try {
                await handleRefreshToken();
                return await api(data);
            } catch (refreshError) {
                console.error("Lỗi làm mới token:", refreshError);
                await handleLogout(refreshError);
            }
        } else {
            return Promise.reject(error);
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleLogout(refreshError: any) {
    handleLogoutAction();
    return Promise.reject(refreshError);
}
