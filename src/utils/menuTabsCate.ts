import { TabsProps } from "antd";
import { routes } from "./menuRouters";

export const tabsCate: TabsProps["items"] = [
    {
        key: routes.manageCate?.url,
        label: "Quản lý danh mục",
    },
    {
        key: routes.createCate?.url,
        label: "Tạo danh mục",
    },
];
