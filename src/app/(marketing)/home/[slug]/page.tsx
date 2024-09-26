import { handleGetProductService } from "@/action/productAction";
import ManageProduct from "@/components/Product/ManageProduct/ManageProduct";

export default async function PageProduct({
    params: { slug },
}: {
    params: { slug: string };
}) {
    return (
        <div className="w-full flex justify-center">
            <div className="sm:w-[70%] w-full">
                <ManageProduct
                    isAdmin={false}
                    type={+slug}
                    api={handleGetProductService}
                />
            </div>
        </div>
    );
}
