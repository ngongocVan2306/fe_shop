import { SweetAlertIcon } from "sweetalert2";

interface RouterItem {
    label: string;
    url: string;
}
export interface IGroupRoute {
    home: RouterItem;
    login: RouterItem;
    register: RouterItem;
    cate: RouterItem;
    createCate: RouterItem;
    manageCate: RouterItem;
    product: RouterItem;
    addProduct: RouterItem;
    manageProduct: RouterItem;
    detail: RouterItem;
    cart: RouterItem;
    search: RouterItem;
}

export interface IRes<T> {
    msg: string;
    code: number;
    data: T;
}

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    address: string;
    avatar: string;
    age: string;
    gender: boolean;
    role: TRole;
}

export type TRole = "user" | "admin";
export type TCate = "shoe" | "shirt" | "trouser" | "dress" | "hat";

export interface ICate {
    name: string;
    type: TCate;
}

export interface IResLogin {
    user: IUser;
    tokens: {
        access_token: string;
        refresh_token: string;
    };
}

export interface ICate {
    id: number;
    name: string;
}

export interface IImage {
    id: number;
    img_url: string;
    product_id: number;
}

export interface IProduct {
    id: number;
    name: string;
    total: number;
    type: number;
    price: number;
    inventory: number;
    imageData: IImage[];
}

export interface IMeta {
    currentPage: number;
    totalIteams: number;
    totalPages: number;
}

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IDataGet<T> {
    items: T[];
    meta: IMeta;
}

export interface ICart {
    id: number;
    user_id: number;
    product_id: number;
    count: number;
    productData: IProduct;
}

export type TInput =
    | "email"
    | "password"
    | "phone"
    | "text"
    | "number"
    | "submit"
    | "";

export interface IMenuRegister {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    rePassword: string;
}

export interface IStatusToast {
    SUCCESS: SweetAlertIcon;
    WARNING: SweetAlertIcon;
    ERROR: SweetAlertIcon;
    QUESTION: SweetAlertIcon;
    INFO: SweetAlertIcon;
}

export interface IMenuSidebar {
    label: string;
    url: string;
    parent: string;
}

export interface ISearchParams {
    page: string;
    pageSize: string;
}

export type TStyoeFlex = "center" | "start" | "end" | "space-between";

export type TLang = "en" | "vi";
