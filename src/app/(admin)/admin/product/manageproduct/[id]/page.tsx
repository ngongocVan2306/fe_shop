import { handleGetProductService } from "@/action/productAction";
import PageError from "@/components/PageError/PageError";
import ManageProduct from "@/components/Product/ManageProduct";
import { mesError, resStatus } from "@/constants";
import { handleGetPagination } from "@/helpers/handleGetPagination";
import { ISearchParams } from "@/utils/interface";
import { Suspense } from "react";

export default async function PageList({
    params: { id },
    searchParams,
}: {
    params: { id: string };
    searchParams: ISearchParams;
}) {
    const pagination = handleGetPagination(searchParams);

    try {
        const res = await handleGetProductService({
            page: pagination.page,
            pageSize: pagination.pageSize,
            type: +id,
        });

        if (res.code === resStatus.SUCCESS) {
            return (
                <Suspense fallback={<div>Loading.....</div>}>
                    <ManageProduct data={res.data} isAdmin={true} />
                </Suspense>
            );
        }

        throw new Error(mesError);
    } catch (error) {
        console.error(error);
        return <PageError />;
    }
}
