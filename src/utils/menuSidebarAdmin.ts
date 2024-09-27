import { defaultPagination } from "@/constants";
import { IMenuSidebar } from "./interface";
import { routes } from "./menuRouters";
import { useTranslation } from "react-i18next";

export const menuSidebarAdmin = (): IMenuSidebar[] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation("sidebarAdmin");

    return [
        {
            label: t("cate"),
            url: routes.manageCate?.url,
            parent: routes.cate.url,
        },
        {
            label: t("products"),
            url: routes.manageProduct?.url + `/${defaultPagination.type}`,
            parent: routes.product.url,
        },
    ];
};
