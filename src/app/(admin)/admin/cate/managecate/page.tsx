import { handleGetCateAction } from "@/action/cateAction";
import ManageCate from "@/components/Cate/ManageCate";
import PageError from "@/components/PageError/PageError";
import { mesError, resStatus } from "@/constants";
import { Suspense } from "react";

export default async function managecate() {
    try {
        const res = await handleGetCateAction();
        if (res.code === resStatus.SUCCESS) {
            return (
                <div>
                    <Suspense fallback={<div>Loading.....</div>}>
                        <ManageCate data={res.data} />
                    </Suspense>
                </div>
            );
        }

        throw new Error(mesError);
    } catch (error) {
        console.log(error);
        return <PageError />;
    }
}
