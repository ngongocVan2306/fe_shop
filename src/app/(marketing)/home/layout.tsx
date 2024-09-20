import { handleGetCateAction } from "@/action/cateAction";
import Header from "@/components/Header/Header";
import PageError from "@/components/PageError/PageError";
import { mesError, resStatus } from "@/constants";
import { Suspense } from "react";

export default async function LayoutHome({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        const res = await handleGetCateAction();

        if (res.code === resStatus.SUCCESS) {
            return (
                <Suspense fallback={<div>Loading.....</div>}>
                    <div className="w-[100%] h-[100%]">
                        <div className="w-[100%] h-[var(--height-header)] fixed top-0 left-0 right-0 z-100 shadow bg-[#fff]">
                            <Header data={res.data} />
                        </div>

                        <div className="mt-[var(--height-header)] z-10">
                            {children}
                        </div>
                    </div>
                </Suspense>
            );
        }

        throw new Error(mesError);
    } catch (error) {
        console.log(error);
        return <PageError />;
    }
}
