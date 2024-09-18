"use client";

import { resStatus } from "@/constants";
import { IDataGet, IMeta, IProduct, IRes } from "@/utils/interface";
import { useEffect, useState } from "react";

const usePagination = ({
    api,
    page,
    pageSize,
    type = 0,
    is_reload = false,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api: any;
    page: number;
    pageSize: number;
    type: number;
    is_reload: boolean;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const [pagination, setPagination] = useState<{
        page: number;
        pageSize: number;
    }>({
        page: page,
        pageSize: pageSize,
    });

    useEffect(() => {
        const _fetch = async () => {
            try {
                setIsLoading(true);

                const Res: IRes<IDataGet<IProduct>> = await api({
                    ...pagination,
                    type: type,
                });

                if (Res.code === resStatus.SUCCESS) {
                    setProducts(Res.data.items);
                    setMeta(Res.data.meta);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        _fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, pagination.page, pagination.pageSize, type, is_reload]);

    const handleChangePage = (page: number) => {
        if (meta) {
            if (page >= 0 && page <= meta.totalPages) {
                setPagination((prev) => ({
                    ...prev,
                    page: page,
                }));
            }
        }
    };

    return {
        isLoading,
        products,
        meta,
        handleChangePage,
    };
};

export default usePagination;
