import { handleSearchMoreProduct } from "@/action/productAction";
import ManageProduct from "@/components/Product/ManageProduct";

const PageSearch = () => {
    return (
        <div className="w-full flex justify-center pt-[20px]">
            <div className="sm:w-[70%] w-full">
                <ManageProduct
                    api={handleSearchMoreProduct}
                    isAdmin={false}
                    type={0}
                />
            </div>
        </div>
    );
};

export default PageSearch;
