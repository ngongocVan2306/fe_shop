import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PaginationCustom = ({ total }: { total: number | undefined }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleChange = (e: number) => {
        const params = new URLSearchParams(searchParams);
        if (e) {
            params.set("page", e.toString());
        }

        replace(`${pathname}?${params.toString()}`);
    };
    return <Pagination total={total} onChange={handleChange} />;
};

export default PaginationCustom;
