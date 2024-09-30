"use client";

import { TabsProps } from "antd";
import { routes } from "./menuRouters";
import { defaultPagination } from "@/constants";
import { useTranslation } from "react-i18next";

export const tabsProduct = (): TabsProps["items"] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation("product");
    return [
        {
            key: routes.manageProduct?.url + `/${defaultPagination.type}`,
            label: t("manageProduct"),
        },
        {
            key: routes.addProduct?.url,
            label: t("labelCreate"),
        },
    ];
};
