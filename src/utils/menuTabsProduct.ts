import { TabsProps } from "antd";
import { routes } from "./menuRouters";

export const tabsProduct: TabsProps["items"] = [
    {
        key: routes.manageProduct?.url + "/0",
        label: "Quản lý sản phẩm",
    },
    {
        key: routes.addProduct?.url,
        label: "Tạo sản phẩm",
    },
];
