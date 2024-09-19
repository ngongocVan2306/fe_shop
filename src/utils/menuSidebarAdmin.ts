import { defaultPagination } from "@/constants";
import { IMenuSidebar } from "./interface";
import { routes } from "./menuRouters";

export const menuSidebarAdmin: IMenuSidebar[] = [
    {
        label: "Danh mục",
        url: routes.manageCate?.url,
        parent: routes.cate.url,
    },
    {
        label: "Sản phẩm",
        url: routes.manageProduct?.url + `/${defaultPagination.type}`,
        parent: routes.product.url,
    },
];
