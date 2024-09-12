"use client";

import CheckAdmin from "@/components/CheckAdmin/CheckAdmin";
import SidebarAdmin from "@/components/SidebarAdmin/SidebarAdmin";
import iconMenu from "../../../../assets/icons/iconMenu.svg";
import Image from "next/image";

import { useState } from "react";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
    const [isView, setIsView] = useState<boolean>(false);

    const handleToggleSibar = () => {
        setIsView(false);
    };
    return (
        <div className="w-full">
            <CheckAdmin>
                <div className="w-[100%] h-[100vh]">
                    <div
                        className={`sm:hidden fixed z-[100] top-[10px] left-[10px] ${
                            isView ? "ml-[50%]" : ""
                        }`}
                        onClick={() => {
                            setIsView(!isView);
                        }}
                    >
                        <Image
                            width={100}
                            height={100}
                            src={iconMenu}
                            alt="menu"
                        />
                    </div>

                    <div
                        className={`sm:w-[15%] w-[50%] h-[100%] fixed top-0 bg-[#fff] overflow-hidden ${
                            isView ? "" : "hidden"
                        } sm:block z-[100] shadow`}
                    >
                        <SidebarAdmin handleToggleSibar={handleToggleSibar} />
                    </div>

                    <div className="sm:ml-[15%] sm:w-[85%] w-[100%] h-[100%]">
                        {children}
                    </div>
                </div>
            </CheckAdmin>
        </div>
    );
};

export default LayoutAdmin;
