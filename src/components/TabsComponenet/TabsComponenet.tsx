"use client";

import { routes } from "@/utils/menuRouters";
import { Tabs } from "antd";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TabsComponenet({ data }: { data: any }) {
    const router = useRouter();

    const onChange = (key: string) => {
        router.push(key);
    };
    return (
        <div className="w-[100%] h-[100%]">
            <Tabs
                defaultActiveKey={routes.manageCate?.url}
                items={data}
                onChange={onChange}
            />
        </div>
    );
}
