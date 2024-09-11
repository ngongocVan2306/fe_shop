"use client";

import { RootState, useAppSelector } from "@/store/store";
import { routes } from "@/utils/menuRouters";
import { useRouter } from "next/navigation";

export default function CheckLogin({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLogin = useAppSelector((state: RootState) => state.auth.isLogin);
    const router = useRouter();

    if (isLogin) {
        router.push(routes.home.url);
        return null;
    }

    return <div className="w-full">{children}</div>;
}
