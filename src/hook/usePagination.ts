"use client";

import { defaultPagination, resStatus } from "@/constants";
import { IDataGet, IMeta, IProduct, IRes } from "@/utils/interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const usePagination = ({
    api,
    pageSize = defaultPagination.pageSize,
    type = defaultPagination.type,
    is_reload = false,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api: any;
    pageSize: number;
    type: number;
    is_reload: boolean;
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);

    const currentPage = useSearchParams().get("page");
    const textSearch = useSearchParams().get("textSearch");

    useEffect(() => {
        const _fetch = async () => {
            try {
                setIsLoading(true);

                const Res: IRes<IDataGet<IProduct>> = await api({
                    pageSize: pageSize,
                    page: currentPage ? currentPage : defaultPagination.page,
                    type: type,
                    textSearch: textSearch,
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
    }, [api, currentPage, type, is_reload, textSearch]);

    return {
        isLoading,
        products,
        meta,
    };
};

export default usePagination;
