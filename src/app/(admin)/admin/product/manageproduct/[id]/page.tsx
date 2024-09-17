import { handleGetProductService } from "@/action/productAction";
import PageError from "@/components/PageError/PageError";
import ManageProduct from "@/components/Product/ManageProduct";
import { defaultPagination, mesError, resStatus } from "@/constants";
import { IDataGet, IProduct } from "@/utils/interface";
import { Suspense } from "react";

const handleData = async (page: number, pageSize: number, id: number) => {
    const res = await handleGetProductService({
        page: page,
        pageSize: pageSize,
        type: id,
    });

    if (res.code !== resStatus.SUCCESS) {
        throw new Error(mesError);
    }

    return res.data;
};

export default async function PageList({
    params: { id },
    searchParams,
}: {
    params: { id: string };
    searchParams?: {
        page?: string;
        pageSize?: string;
    };
}) {
    const page = +(searchParams?.page ?? defaultPagination.page);
    const pageSize = +(searchParams?.pageSize ?? defaultPagination.pageSize);

    try {
        const data: IDataGet<IProduct> = await handleData(page, pageSize, +id);
        return (
            <Suspense fallback={<div>Loading.....</div>}>
                <ManageProduct data={data} isAdmin={true} />
            </Suspense>
        );
    } catch (error) {
        console.error(error);
        return <PageError />;
    }
}
