"use client";

import { handleGetCartService } from "@/action/cartAction";
import usePagination from "@/hook/usePagination";

import { ICart } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty } from "antd";
import { useState } from "react";
import PaginationCustom from "../PaginationCustom/PaginationCustom";
import CartItem from "./CartItem";

const Cart = () => {
    const [reload, setReload] = useState<boolean>(false);

    const { isLoading, carts, meta } = usePagination({
        api: handleGetCartService,
        is_reload: reload,
    });

    return (
        <div className="w-full h-[100vh] p-[20px] bg-[#f4f4f4]">
            <div className="w-full flex justify-center max-h-[80vh] overflow-auto none-scroll-bar bg-[#fff] shadow rounded-[10px]">
                <div className="w-full  p-[20px] ">
                    {!isEmpty(carts) ? (
                        carts.map((item: ICart) => {
                            return (
                                <CartItem
                                    key={item.id}
                                    cart={item}
                                    handleReload={() => setReload(!reload)}
                                    isLoading={isLoading}
                                />
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
};

export default Cart;
