import { handleGetCateAction } from "@/action/cateAction";
import ManageCate from "@/components/Cate/ManageCate";
import PageError from "@/components/PageError/PageError";
import { mesError, resStatus } from "@/constants";
import { ICate } from "@/utils/interface";
import { Suspense } from "react";

const handleAction = async () => {
    const res = await handleGetCateAction();
    if (res.code === resStatus.SUCCESS) {
        return res.data;
    }

    throw new Error(mesError);
};

export default async function managecate() {
    let data: ICate[];

    try {
        data = await handleAction();
    } catch (error) {
        console.log(error);
        return <PageError />;
    }
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <ManageCate data={data} />
            </Suspense>
        </div>
    );
}
