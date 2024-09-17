import { defaultPagination } from "./defaultPagination";
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
        url: routes.manageProduct?.url + `/0${defaultPagination}`,
        parent: routes.product.url,
    },
];
