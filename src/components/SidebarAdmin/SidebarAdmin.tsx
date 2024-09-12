"use client";

import Image from "next/image";
import bunbu from "../../../public/bunbu.png";
import { usePathname } from "next/navigation";
import { routes } from "@/utils/menuRouters";
import { defaultPagination } from "@/utils/defaultPagination";
import Link from "next/link";

export default function SidebarAdmin({
    handleToggleSibar,
}: {
    handleToggleSibar: () => void;
}) {
    const pathName = usePathname();

    return (
        <div className="w-[100%] h-[100vh] shadow">
            <div className="w-[100%] flex justify-center py-[20px] border-solid border-b-[1px] border-[#ddd]">
                <Link href={routes.home.url + `/0${defaultPagination}`}>
                    <Image
                        width={100}
                        height={100}
                        src={bunbu}
                        alt="logo"
                        className="hover:cursor-pointer"
                    />
                </Link>
            </div>

            <ul className=" w-[100%]">
                <Link href={routes.manageCate?.url}>
                    <li
                        className={`w-[100%] p-[10px] text-center hover:cursor-pointer hover:bg-[#00FFFF] ${
                            pathName.includes(routes.cate.url)
                                ? " bg-[#00FFFF] text-[#fff]"
                                : ""
                        }`}
                        onClick={() => handleToggleSibar()}
                    >
                        Danh Mục{" "}
                    </li>
                </Link>

                <Link
                    href={routes.manageProduct?.url + `/0${defaultPagination}`}
                >
                    <li
                        className={`w-[100%] p-[10px] text-center hover:cursor-pointer hover:bg-[#00FFFF] ${
                            pathName.includes(routes.product.url)
                                ? "bg-[#00FFFF] text-[#fff]"
                                : ""
                        }`}
                        onClick={() => handleToggleSibar()}
                    >
                        Sản phẩm
                    </li>
                </Link>
            </ul>
        </div>
    );
}
