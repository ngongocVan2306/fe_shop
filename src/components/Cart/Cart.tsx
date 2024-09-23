"use client";

import {
    handleDeleteCartService,
    handleGetCartService,
} from "@/action/cartAction";
import { resStatus, toastStatus } from "@/constants";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import usePagination from "@/hook/usePagination";
import { DeleteCart } from "@/store/feauture/cartSlice";
import { useAppDispatch } from "@/store/store";
import { ICart } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty } from "antd";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import PaginationCustom from "../PaginationCustom/PaginationCustom";
import Quantity from "../Quantity/Quantity";

export default function Cart() {
    const [reload, setReload] = useState<boolean>(false);

    const { isLoading, carts, meta } = usePagination({
        api: handleGetCartService,
        is_reload: reload,
    });
    const dispatch = useAppDispatch();

    const handleDeleteCart = async (cart: ICart) => {
        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `Bạn có chác muốn xóa đoan hàng ${cart.productData.name} ?`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await handleDeleteCartService(cart.id);

                if (res.code === resStatus.SUCCESS) {
                    setReload(!reload);
                    dispatch(DeleteCart());
                }

                Swal.fire({
                    icon:
                        res.code === resStatus.SUCCESS
                            ? toastStatus.SUCCESS
                            : toastStatus.WARNING,
                    title: res.msg,
                });
            }
        });
    };

    return (
        <div className="w-full h-[100vh] p-[20px] bg-[#f4f4f4]">
            <div className="w-full flex justify-center max-h-[80vh] overflow-auto none-scroll-bar bg-[#fff] shadow rounded-[10px]">
                <div className="w-full  p-[20px] ">
                    {!isEmpty(carts) ? (
                        carts.map((item: ICart) => {
                            return (
                                <div
                                    key={item.id}
                                    className="sm:flex sm:justify-center w-full border-solid border-b-[1px] border-[#ccc] py-[20px] grid grid-cols-2 gap-4"
                                >
                                    <div className="sm:w-[10%]">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={
                                                process.env
                                                    .NEXT_PUBLIC_BASE_IMAGE +
                                                item.productData.imageData[0]
                                                    .img_url
                                            }
                                            alt="thumbnail"
                                            className="w-[100%] rounded-[5px] shadow"
                                        />
                                    </div>

                                    <div className="w-[70%] ml-[20px] border-solid sm:border-r-[1px] border-[#ccc]">
                                        <h5 className="font-[600] text-[16px]">
                                            {item.productData.name}
                                        </h5>

                                        <div className="w-[50%] my-[20px]">
                                            <Quantity
                                                count={item.count}
                                                inventory={
                                                    item.productData.inventory
                                                }
                                                isDetail={false}
                                                id={item.id}
                                                handleReload={() =>
                                                    setReload(!reload)
                                                }
                                            />
                                        </div>

                                        <h5>
                                            Giá tiền :{" "}
                                            <span className="text-[var(--color-price)]">
                                                {handleFomatVnd(
                                                    item.count *
                                                        item.productData.price
                                                )}
                                            </span>
                                        </h5>
                                    </div>

                                    <div className="sm:w-[20%] flex sm:flex-col flex-row justify-around items-center p-[10px] col-span-2">
                                        <button
                                            className="sm:w-[100%] w-[45%] bg-[red] p-[4px] rounded-[10px] shadow text-[#fff] hover:opacity-[0.6]"
                                            onClick={() =>
                                                !isLoading
                                                    ? handleDeleteCart(item)
                                                    : null
                                            }
                                        >
                                            Xóa
                                        </button>
                                        <button className="sm:w-[100%] w-[45%] bg-[blue] p-[4px] rounded-[10px] shadow text-[#fff] hover:opacity-[0.6]">
                                            Mua ngay
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <Empty />
                    )}
                </div>
            </div>

            <div className="w-full flex justify-center my-[40px]">
                <PaginationCustom total={meta?.totalIteams} />
            </div>
        </div>
    );
}
