import { IStatusToast } from "@/utils/interface";

export const api = {
    REGISTER: "/user/register",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    CATE: "/cate",
    PRODUCT: "/product",
};

export const resStatus = {
    SUCCESS: 200,
};

export const toastStatus: IStatusToast = {
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    QUESTION: "question",
    INFO: "info",
};

export const role = {
    ADMIN: "admin",
};

export const mesError: string = "Đã có lỗi xảy ra bạn vui lòng thử lại sau !";
