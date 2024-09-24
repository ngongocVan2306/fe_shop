import ManageCate from "@/components/Cate/ManageCate";
import { Suspense } from "react";

export default async function managecate() {
    return (
        <div>
            <Suspense fallback={<div>Loading.....</div>}>
                <ManageCate />
            </Suspense>
        </div>
    );
}
