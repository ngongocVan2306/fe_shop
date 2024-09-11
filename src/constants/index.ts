import { IToastStatus } from "@/utils/interface";
import { SweetAlertIcon } from "sweetalert2";

export const api = {
    REGISTER: "/user/register",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
};

export const toastStatus: IToastStatus = {
    SUCCESS: "success",
    WARNING: "warning",
    INFO: "info",
    ERROR: "error",
};
