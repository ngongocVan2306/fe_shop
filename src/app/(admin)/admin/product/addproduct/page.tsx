import { handleGetCateAction } from "@/action/cateAction";
import AddProduct from "@/components/AddProduct/AddProduct";
import PageError from "@/components/PageError/PageError";
import { mesError, resStatus } from "@/constants";

export default async function PageAddProduct() {
    try {
        const res = await handleGetCateAction();
        if (res.code === resStatus.SUCCESS) {
            return (
                <div className="w-[100%] h-[100%]">
                    <AddProduct cates={res.data} />
                </div>
            );
        }

        throw new Error(mesError);
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
