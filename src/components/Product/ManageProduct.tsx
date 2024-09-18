"use client";

import {
    handleDeleteProductService,
    handleGetProductService,
} from "@/action/productAction";
import {
    defaultPagination,
    mesError,
    resStatus,
    toastStatus,
} from "@/constants";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import { IProduct } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty, Pagination } from "antd";
import Image from "next/image";
import Swal from "sweetalert2";
import usePagination from "@/hook/usePagination";
import { useState } from "react";

export default function ManageProduct({
    isAdmin,
    type,
}: {
    isAdmin: boolean;
    type: number;
}) {
    const [reload, setReload] = useState<boolean>(false);

    const { isLoading, products, meta, handleChangePage } = usePagination({
        api: handleGetProductService,
        is_reload: reload,
        page: defaultPagination.page,
        pageSize: defaultPagination.pageSize,
        type: type,
    });

    const handleDeleteProduct = (e: React.MouseEvent, product: IProduct) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `Bạn có chắc muốn xóa ${product.name} không?`,
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await handleDeleteProductService(product.id);
                    if (res.code === resStatus.SUCCESS) {
                        setReload(!reload);
                    }
                    Swal.fire({
                        icon:
                            res.code === resStatus.SUCCESS
                                ? toastStatus.SUCCESS
                                : toastStatus.WARNING,
                        title: res.msg,
                    });
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
        <div className="w-full h-full sm:p-[20px]">
            <div className="">
                {!isEmpty(products) ? (
                    <div className="grid sm:grid-cols-5 grid-cols-2 gap-4">
                        {products.map((item: IProduct) => {
                            return (
                                <div
                                    className="border-solid border-[1px] border-[#ccc] rounded-[10px] shadow hover:cursor-pointer hover:opacity-[0.6]"
                                    key={item.id}
                                >
                                    <div className="w-full h-[200px] overflow-hidden">
                                        <Image
                                            width={100}
                                            height={100}
                                            className="w-full object-contain rounded-[10px]"
                                            src={`${
                                                process.env
                                                    .NEXT_PUBLIC_BASE_IMAGE +
                                                item?.imageData[0]?.img_url
                                            }`}
                                            alt="image"
                                        />
                                    </div>

                                    <div className="p-[10px]">
                                        <h5 className="truncate">
                                            {" "}
                                            {item.name}
                                        </h5>
                                        <h5 className="text-[var(--color-price)]">
                                            {handleFomatVnd(item.price)}
                                        </h5>
                                        <h5>
                                            Đã bán :{" "}
                                            <span>
                                                {item.total - item.inventory}
                                            </span>
                                        </h5>
                                        <h5>
                                            Hàng trong kho :{" "}
                                            <span>{item.inventory}</span>
                                        </h5>

                                        {isAdmin ? (
                                            <button
                                                className="bg-[red] text-[#fff] w-[50%] p-[4px] rounded-[10px] shadow hover:opacity-[0.6] mt-[10px]"
                                                onClick={(e) => {
                                                    !isLoading
                                                        ? handleDeleteProduct(
                                                              e,
                                                              item
                                                          )
                                                        : null;
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <Empty />
                    </div>
                )}
            </div>

            {meta && meta.totalIteams > 0 && (
                <div className="w-full flex justify-center my-[40px]">
                    <Pagination
                        total={meta.totalIteams}
                        onChange={(e) => handleChangePage(e)}
                    />
                </div>
            )}
        </div>
    );
}
