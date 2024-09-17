import { handleGetProductService } from "@/action/productAction";
import PageError from "@/components/PageError/PageError";
import ManageProduct from "@/components/Product/ManageProduct";
import { defaultPagination, mesError, resStatus } from "@/constants";
import { IDataGet, IProduct } from "@/utils/interface";
import { Suspense } from "react";

const handleData = async () => {
    const res = await handleGetProductService({
        page: defaultPagination.page,
        pageSize: defaultPagination.pageSize,
        type: defaultPagination.type,
    });
    if (res.code === resStatus.SUCCESS) {
        return res.data;
    }

    throw new Error(mesError);
};

export default async function PageHome() {
    let data: IDataGet<IProduct>;
    try {
        data = await handleData();

        return (
            <Suspense fallback={<div>Loading.....</div>}>
                <div className="pt-[10px] w-full flex justify-center">
                    <div className="sm:w-[70%] w-full">
                        <ManageProduct data={data} isAdmin={false} />
                    </div>
                </div>
            </Suspense>
        );
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
