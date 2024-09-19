import { IGroupRoute } from "@/utils/interface";

export const routes: IGroupRoute = {
    home: {
        label: "home",
        url: "/home",
    },
    login: {
        label: "login",
        url: "/auth/login",
    },
    register: {
        label: "register",
        url: "/auth/register",
    },
    cate: {
        label: "cate",
        url: "/admin/cate",
    },
    createCate: {
        label: "createCate",
        url: "/admin/cate/createCate",
    },
    manageCate: {
        label: "manageCate",
        url: "/admin/cate/managecate",
    },
    product: {
        label: "product",
        url: "/admin/product",
    },
    addProduct: {
        label: "addProduct",
        url: "/admin/product/addproduct",
    },
    manageProduct: {
        label: "manageProduct",
        url: "/admin/product/manageproduct",
    },
    detail: {
        label: "detailProduct",
        url: "/home/detail/",
    },
    cart: {
        label: "cart",
        url: "/home/cart",
    },
    search: {
        label: "search",
        url: "/home/search",
    },
};
