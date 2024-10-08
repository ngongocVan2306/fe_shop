import { IStatusToast } from "@/utils/interface";

export const api = {
    REGISTER: "/user/register",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    REFRESHTOKEN: "/user/refresh",
    CATE: "/cate",
    PRODUCT: {
        DEFAULT: "/product",
        SEARCH: "/product/search",
        DETAIL: "/product/detail",
        CART: "/product/cart",
        COUTCART: "/product/count",
        ADDCART: "/product/addcart",
        CHANGECART: "/product/change-cart",
    },
};

export const resStatus = {
    SUCCESS: 200,
    UNAUTHORIZED: 401,
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

export const defaultPagination = {
    page: 1,
    pageSize: 10,
    type: 0,
    userId: 0,
};

export const maxAge = {
    maxAgeAccess: 10,
    maxAgeRefresh: 12 * 30 * 24 * 60 * 60 * 1000,
};
