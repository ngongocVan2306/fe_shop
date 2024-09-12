import { IStatusToast } from "@/utils/interface";

export const api = {
    REGISTER: "/user/register",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
};

export const resStatus = {
    SUCCESS: 200,
};

export const toastStatus: IStatusToast = {
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
};
