import { handleGetCateAction } from "@/action/cateAction";
import Header from "@/components/Header/Header";
import PageError from "@/components/PageError/PageError";
import { mesError, resStatus } from "@/constants";
import { ICate } from "@/utils/interface";
import { Suspense } from "react";

const HandleData = async () => {
    const res = await handleGetCateAction();

    if (res.code === resStatus.SUCCESS) {
        return res.data;
    }

    throw new Error(mesError);
};

export default async function LayoutHome({
    children,
}: {
    children: React.ReactNode;
}) {
    let data: ICate[];

    try {
        data = await HandleData();
        return (
            <Suspense fallback={<div>Loading.....</div>}>
                <div className="w-[100%] h-[100%]">
                    <div className="w-[100%] h-[var(--height-header)] fixed top-0 left-0 right-0 z-100 shadow bg-[#fff]">
                        <Header data={data} />
                    </div>

                    <div className="mt-[var(--height-header)] p-[10px] sm:p-[0px] z-10">
                        {children}
                    </div>
                </div>
            </Suspense>
        );
    } catch (error) {
        console.log(error);
        return <PageError />;
    }
}
