"use client";

import { defaultPagination } from "@/constants";
import { IProduct } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import usePagination from "@/hook/usePagination";
import { useState } from "react";
import PaginationCustom from "../../PaginationCustom/PaginationCustom";
import Card from "../Card/Card";

import PageError from "@/components/PageError/PageError";
import {
    ContentManage,
    FormGrid,
    FormManage,
    FormPagination,
} from "./ManageProduct.styled";

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
        <FormManage>
            <ContentManage>
                {!isEmpty(products) ? (
                    <FormGrid>
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
                    </FormGrid>
                ) : (
                    <PageError />
                )}
            </ContentManage>

            {meta && meta.totalIteams > 0 && (
                <FormPagination>
                    <PaginationCustom total={meta?.totalIteams} />
                </FormPagination>
            )}
        </FormManage>
    );
}
