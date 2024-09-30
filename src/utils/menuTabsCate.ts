"use client";

import { TabsProps } from "antd";
import { routes } from "./menuRouters";
import { useTranslation } from "react-i18next";

export const tabsCate = (): TabsProps["items"] => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation("cate");

    return [
        {
            key: routes.manageCate?.url,
            label: t("labelManage"),
        },
        {
            key: routes.createCate?.url,
            label: t("labelCreate"),
        },
    ];
};
