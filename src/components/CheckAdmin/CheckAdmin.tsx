"use client";

import { role, toastStatus } from "@/constants";
import { RootState, useAppSelector } from "@/store/store";
import { routes } from "@/utils/menuRouters";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CheckAdmin = ({ children }: { children: React.ReactNode }) => {
    const infoUser = useAppSelector((state: RootState) => state.auth.infoUser);
    const router = useRouter();

    if (infoUser.role !== role.ADMIN) {
        Swal.fire({
            icon: toastStatus.WARNING,
            title: "Bạn không có quyền truy cập !",
        });
        router.push(routes.home.url);
        return null;
    }
    return <div className="w-full">{children}</div>;
};

export default CheckAdmin;
