import { TabsProps } from "antd";
import { routes } from "./menuRouters";
import { defaultPagination } from "@/constants";

export const tabsProduct: TabsProps["items"] = [
    {
        key:
            routes.manageProduct?.url +
            `/${defaultPagination.type}${defaultPagination.url}`,
        label: "Quản lý sản phẩm",
    },
    {
        key: routes.addProduct?.url,
        label: "Tạo sản phẩm",
    },
];
