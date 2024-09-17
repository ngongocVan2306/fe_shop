"use client";

import { handleDeleteProductService } from "@/action/productAction";
import { mesError, resStatus, toastStatus } from "@/constants";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import { IDataGet, IProduct } from "@/utils/interface";
import { Empty, Pagination } from "antd";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ManageProduct({
    data,
    isAdmin,
}: {
    data: IDataGet<IProduct>;
    isAdmin: boolean;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleChange = (e: number) => {
        const params = new URLSearchParams(searchParams);
        if (e) {
            params.set("page", e.toString());
        }

        replace(`${pathname}?${params.toString()}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDeleteProduct = (e: any, product: IProduct) => {
        setIsLoading(true);
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }

        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `Bạn có chắc muốn xóa ${product.name} không ?`,
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await handleDeleteProductService(product.id);
                    if (res.code === resStatus.SUCCESS) {
                        router.refresh();
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

        setIsLoading(false);
    };

    return (
        <div className="w-full h-full sm:p-[20px]">
            <div className="">
                {data && data.items.length > 0 ? (
                    <div className="grid sm:grid-cols-5 grid-cols-2 gap-4">
                        {data.items.map((item: IProduct) => {
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

            {data.meta && data.meta.totalIteams > 0 && (
                <div className="w-full flex justify-center my-[40px]">
                    <Pagination
                        defaultCurrent={data.meta.currentPage}
                        total={data.meta.totalIteams}
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    );
}
