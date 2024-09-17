"use client";

import { defaultPagination } from "@/constants";
import { ICate } from "@/utils/interface";
import { routes } from "@/utils/menuRouters";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import iconMenu from "../../../assets/icons/iconMenu.svg";
import Image from "next/image";

export default function Categories({ data }: { data: ICate[] }) {
    const router = useRouter();
    const [currentType, setCurrentType] = useState<number>(0);
    const [isView, setIsView] = useState<boolean>(true);

    const [width, setWidth] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleRedirect = useCallback(
        (url: number) => {
            setCurrentType(url);
            router.push(`${routes.home.url}/${url}${defaultPagination.url}`);
        },
        [router]
    );

    return (
        <div className="form-content w-full h-full relative">
            <button
                className="sm:hidden h-full ml-[10px]"
                onClick={() => setIsView(!isView)}
            >
                <Image width={100} height={100} src={iconMenu} alt="menu" />
            </button>
            {isView ? (
                <ul className="justify-center items-center sm:h-[100%] sm:w-full overflow-x-auto none-scroll-bar sm:flex sm:flex-row flex-col bg-[#fff] sm:shadow-none shadow absolute z-[100] w-[200px]">
                    <li
                        key={0}
                        className={`${
                            currentType === 0
                                ? "sm:border-b-[2px] border-[blue] border-solid"
                                : ""
                        } px-[10px] mx-[10px] sm:h-[100%] pt-[20px] text-center font-semibold hover:cursor-pointer sm:hover:border-b-[2px] hover:border-[blue] hover:border-solid hover:text-[blue]`}
                        onClick={() => {
                            width <= 650 && setIsView(!isView);
                            handleRedirect(0);
                        }}
                    >
                        <p
                            className={`${
                                0 === currentType ? "text-[blue]" : ""
                            }`}
                        >
                            Tất cả
                        </p>
                    </li>

                    {data &&
                        data.length > 0 &&
                        data.map((item) => (
                            <li
                                key={item.id}
                                className={`${
                                    item.id === currentType
                                        ? "sm:border-b-[2px] border-[blue] border-solid"
                                        : ""
                                } px-[10px] mx-[10px] sm:h-[100%] pt-[20px] text-center font-semibold hover:cursor-pointer sm:hover:border-b-[2px] hover:border-[blue] hover:border-solid hover:text-[blue]`}
                                onClick={() => {
                                    width <= 650 && setIsView(!isView);
                                    handleRedirect(item.id);
                                }}
                            >
                                <p
                                    className={`${
                                        item.id === currentType
                                            ? "text-[blue]"
                                            : ""
                                    }`}
                                >
                                    {item.name}
                                </p>
                            </li>
                        ))}
                </ul>
            ) : null}
        </div>
    );
}
