"use client";

import { defaultPagination } from "@/constants";
import { IProduct } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty } from "antd";
import usePagination from "@/hook/usePagination";
import { useState } from "react";
import PaginationCustom from "../PaginationCustom/PaginationCustom";
import Card from "./Card";
import { DivFlex, DivGrid, DivStyled } from "@/styledComponent/Div";

export default function ManageProduct({
    isAdmin,
    type,
    api,
}: {
    isAdmin: boolean;
    type: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api: any;
}) {
    const [reload, setReload] = useState<boolean>(false);

    const { isLoading, products, meta } = usePagination({
        api: api,
        is_reload: reload,
        pageSize: defaultPagination.pageSize,
        type: type,
    });

    return (
        <DivStyled padding="20px">
            {!isEmpty(products) ? (
                <DivGrid columns={5} gap="10px">
                    {products.map((item: IProduct) => {
                        return (
                            <Card
                                handleReload={() => setReload(!reload)}
                                isAdmin={isAdmin}
                                products={item}
                                isLoading={isLoading}
                                key={item.id}
                            />
                        );
                    })}
                </DivGrid>
            ) : (
                <DivFlex>
                    <Empty />
                </DivFlex>
            )}

            {meta && meta.totalIteams > 0 && (
                <DivFlex marginTop="40px">
                    <PaginationCustom total={meta?.totalIteams} />
                </DivFlex>
            )}
        </DivStyled>
    );
}
