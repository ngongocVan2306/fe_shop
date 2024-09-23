"use client";

import {
    handleDeleteCateAction,
    handleGetCateAction,
} from "@/action/cateAction";
import { mesError, resStatus, toastStatus } from "@/constants";
import { ICate } from "@/utils/interface";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { isEmpty } from "@/utils/isEmpty";
import Image from "next/image";
import iconTrash from "../../../assets/icons/iconTrash.svg";

export default function ManageCate() {
    const [cates, setCates] = useState<ICate[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await handleGetCateAction();
            if (res.code === resStatus.SUCCESS) {
                setCates(res.data);
            }
        };

        fetch();
    }, []);

    const handleDeleteCate = (data: ICate) => {
        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `Bạn có chắc muốn xóa danh mục ${data.name} ?`,
            showDenyButton: true,
            confirmButtonText: "OK",
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await handleDeleteCateAction(data.id);
                    Swal.fire({
                        icon:
                            res.code === resStatus.SUCCESS
                                ? toastStatus.SUCCESS
                                : toastStatus.WARNING,
                        title: res.msg,
                    });

                    if (res.code === resStatus.SUCCESS) {
                        setCates(cates.filter((item) => item.id !== data.id));
                    }
                } catch (err) {
                    console.log(err);
                    Swal.fire({
                        icon: toastStatus.ERROR,
                        title: mesError,
                    });
                }
            }
        });
    };
    return (
        <div className="w-full h-full p-[20px]">
            <h4 className="text-[20px] font-semibold text-center mb-[20px]">
                Quản lí danh mục
            </h4>
            <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 w-full">
                {!isEmpty(cates) &&
                    cates.map((item: ICate) => {
                        return (
                            <div
                                className="border-solid border-[1px] border-[#ccc] rounded-[10px] p-[20px] shadow flex justify-between"
                                key={item.id}
                            >
                                <p className="text-center">{item.name}</p>

                                <button
                                    className="bg-[red] px-[16px] py-[4px] rounded-[10px] hover:opacity-[0.6]"
                                    onClick={() => handleDeleteCate(item)}
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={iconTrash}
                                        alt="trash"
                                    />
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
