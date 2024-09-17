import { handleGetCateAction } from "@/action/cateAction";
import AddProduct from "@/components/AddProduct/AddProduct";
import PageError from "@/components/PageError/PageError";
import { mesError, resStatus } from "@/constants";
import { ICate } from "@/utils/interface";

const handleData = async () => {
    const res = await handleGetCateAction();
    if (res.code === resStatus.SUCCESS) {
        return res.data;
    }

    throw new Error(mesError);
};

export default async function PageAddProduct() {
    try {
        const res: ICate[] = await handleData();
        return (
            <div className="w-[100%] h-[100%]">
                <AddProduct cates={res} />
            </div>
        );
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
