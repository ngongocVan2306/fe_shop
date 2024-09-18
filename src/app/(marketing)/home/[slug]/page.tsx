import { handleGetProductService } from "@/action/productAction";
import PageError from "@/components/PageError/PageError";
import ManageProduct from "@/components/Product/ManageProduct";
import { mesError, resStatus } from "@/constants";
import { handleGetPagination } from "@/helpers/handleGetPagination";
import { ISearchParams } from "@/utils/interface";
import { Suspense } from "react";

export default async function PageProduct({
    params: { slug },
    searchParams,
}: {
    params: { slug: string };
    searchParams: ISearchParams;
}) {
    const pagination = handleGetPagination(searchParams);

    try {
        const res = await handleGetProductService({
            page: pagination.page,
            pageSize: pagination.pageSize,
            type: +slug,
        });

        if (res.code === resStatus.SUCCESS) {
            return (
                <div className="w-full flex justify-center">
                    <Suspense fallback={<div>Loading.....</div>}>
                        <div className="w-[70%]">
                            <ManageProduct data={res.data} isAdmin={false} />
                        </div>
                    </Suspense>
                </div>
            );
        }

        throw new Error(mesError);
    } catch (error) {
        console.error(error);
        return <PageError />;
    }
}
