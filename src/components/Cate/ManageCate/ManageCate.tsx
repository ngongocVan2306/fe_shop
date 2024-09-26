"use client";

import {
    handleDeleteCateAction,
    handleGetCateAction,
} from "@/action/cateAction";
import { mesError, resStatus, toastStatus } from "@/constants";
import { ICate } from "@/utils/interface";
import Swal from "sweetalert2";
import { isEmpty } from "@/utils/isEmpty";
import Image from "next/image";
import iconTrash from "../../../../assets/icons/iconTrash.svg";
import useGetAllData from "@/hook/useGetAllData";
import { FormManageCate } from "./ManageCate.styled";

export default function ManageCate() {
    const { data, handleReload } = useGetAllData({ api: handleGetCateAction });

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
                        handleReload();
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
        <FormManageCate>
            <h2>Quản lí danh mục</h2>

            <div className="list-cate">
                {!isEmpty(data) &&
                    data.map((item: ICate) => {
                        return (
                            <div className="item-cate" key={item.id}>
                                <p>{item.name}</p>
                                <button onClick={() => handleDeleteCate(item)}>
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
        </FormManageCate>
    );
}
