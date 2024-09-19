import { handleGEtDetailProduct } from "@/action/productAction";
import PageError from "@/components/PageError/PageError";
import DetailProduct from "@/components/Product/DetailProduct";
import { mesError, resStatus } from "@/constants";

interface IParams {
    params: {
        id: string;
    };
}

export default async function PageDetailProduct({ params: { id } }: IParams) {
    try {
        const res = await handleGEtDetailProduct(+id);
        if (res.code === resStatus.SUCCESS) {
            return (
                <div className="w-[100%] h-full">
                    <DetailProduct product={res.data} />
                </div>
            );
        }

        throw new Error(mesError);
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
