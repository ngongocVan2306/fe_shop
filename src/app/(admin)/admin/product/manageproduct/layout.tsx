import { handleGetCateAction } from "@/action/cateAction";
import PageError from "@/components/PageError/PageError";
import OptionCate from "@/components/Product/OptionCate";
import { mesError, resStatus } from "@/constants";
import { ICate } from "@/utils/interface";

const handleData = async () => {
    const res = await handleGetCateAction();
    if (res.code === resStatus.SUCCESS) {
        return res.data;
    }
    throw new Error(mesError);
};

export default async function LayoutManageProduct({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        const data: ICate[] = await handleData();
        return (
            <div className="w-[100%] h-[100%]">
                <OptionCate cates={data} />

                <div className="w-full">{children}</div>
            </div>
        );
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
