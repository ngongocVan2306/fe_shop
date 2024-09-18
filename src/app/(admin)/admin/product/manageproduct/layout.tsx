import { handleGetCateAction } from "@/action/cateAction";
import PageError from "@/components/PageError/PageError";
import OptionCate from "@/components/Product/OptionCate";
import { mesError, resStatus } from "@/constants";

export default async function LayoutManageProduct({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        const res = await handleGetCateAction();

        if (res.code === resStatus.SUCCESS) {
            return (
                <div className="w-[100%] h-[100%]">
                    <OptionCate cates={res.data} />

                    <div className="w-full">{children}</div>
                </div>
            );
        }

        throw new Error(mesError);
    } catch (err) {
        console.log(err);
        return <PageError />;
    }
}
