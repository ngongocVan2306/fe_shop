"use client";

import { defaultPagination } from "@/constants";
import { IProduct } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty } from "antd";
import usePagination from "@/hook/usePagination";
import { useState } from "react";
import PaginationCustom from "../PaginationCustom/PaginationCustom";

import Card from "./Card";

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
        <div className="w-full h-full sm:p-[20px]">
            <div className="">
                {!isEmpty(products) ? (
                    <div className="grid sm:grid-cols-5 grid-cols-2 gap-4">
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
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <Empty />
                    </div>
                )}
            </div>

            {meta && meta.totalIteams > 0 && (
                <div className="w-full flex justify-center my-[40px]">
                    <PaginationCustom total={meta?.totalIteams} />
                </div>
            )}
        </div>
    );
}
