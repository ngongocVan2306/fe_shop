import { handleGetProductService } from "@/action/productAction";
import PageError from "@/components/PageError/PageError";
import ManageProduct from "@/components/Product/ManageProduct";
import { defaultPagination, mesError, resStatus } from "@/constants";
import { Suspense } from "react";

export default async function PageHome() {
    try {
        const res = await handleGetProductService({
            page: defaultPagination.page,
            pageSize: defaultPagination.pageSize,
            type: defaultPagination.type,
        });
        if (res.code === resStatus.SUCCESS) {
            return (
                <Suspense fallback={<div>Loading.....</div>}>
                    <div className="pt-[10px] w-full flex justify-center">
                        <div className="sm:w-[70%] w-full">
                            <ManageProduct data={res.data} isAdmin={false} />
                        </div>
                    </div>
                </Suspense>
            );
        }

        throw new Error(mesError);
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
