import { SweetAlertIcon } from "sweetalert2";

export interface IGroupRoute {
    home: {
        label: string;
        url: string;
    };
    login: {
        label: string;
        url: string;
    };
    register: {
        label: string;
        url: string;
    };
    cate: {
        label: string;
        url: string;
    };
    createCate: {
        label: string;
        url: string;
    };
    manageCate: {
        label: string;
        url: string;
    };
    product: {
        label: string;
        url: string;
    };
    addProduct: {
        label: string;
        url: string;
    };
    manageProduct: {
        label: string;
        url: string;
    };
    detail: {
        label: string;
        url: string;
    };
    cart: {
        label: string;
        url: string;
    };
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
    // user: Omit<IUser, "password">;
    // tokens: {
    //     access_token: string;
    //     refresh_token: string;
    // };
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

export type TInput = "email" | "password" | "phone" | "text";

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
}
