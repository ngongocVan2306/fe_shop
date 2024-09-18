"use client";

import Image from "next/image";
import bunbu from "../../../public/bunbu.png";
import { usePathname } from "next/navigation";
import { routes } from "@/utils/menuRouters";
import Link from "next/link";
import { menuSidebarAdmin } from "@/utils/menuSidebarAdmin";
import { defaultPagination } from "@/constants";
import { isEmpty } from "@/utils/isEmpty";

export default function SidebarAdmin({
    handleToggleSibar,
}: {
    handleToggleSibar: () => void;
}) {
    const pathName = usePathname();

    return (
        <div className="w-[100%] h-[100vh] shadow">
            <div className="w-[100%] flex justify-center py-[20px] border-solid border-b-[1px] border-[#ddd]">
                <Link
                    href={
                        routes.home.url +
                        `/${defaultPagination.type}${defaultPagination.url}`
                    }
                >
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
                {!isEmpty(menuSidebarAdmin) &&
                    menuSidebarAdmin.map((item, index) => {
                        return (
                            <Link href={item.url} key={index}>
                                <li
                                    className={`w-[100%] p-[10px] text-center hover:cursor-pointer hover:bg-[#00FFFF] ${
                                        pathName.includes(item.parent)
                                            ? " bg-[#00FFFF] text-[#fff]"
                                            : ""
                                    }`}
                                    onClick={() => handleToggleSibar()}
                                >
                                    {item.label}
                                </li>
                            </Link>
                        );
                    })}
            </ul>
        </div>
    );
}
