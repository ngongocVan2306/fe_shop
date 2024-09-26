import { handleGetProductService } from "@/action/productAction";
import ManageProduct from "@/components/Product/ManageProduct/ManageProduct";

import { Suspense } from "react";

export default async function PageList({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <Suspense fallback={<div>Loading.....</div>}>
            <ManageProduct
                type={+id}
                isAdmin={true}
                api={handleGetProductService}
            />
        </Suspense>
    );
}
