"use client";

import { handleGetCartService } from "@/action/cartAction";
import usePagination from "@/hook/usePagination";

import { ICart } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty } from "antd";
import { useState } from "react";
import CartItem from "../CartItem";
import PaginationCustom from "@/components/PaginationCustom/PaginationCustom";
import { ManageCart } from "./Cart.styled";

const Cart = () => {
    const [reload, setReload] = useState<boolean>(false);

    const { isLoading, carts, meta } = usePagination({
        api: handleGetCartService,
        is_reload: reload,
    });

    return (
        <ManageCart height="100vh">
            <div className="list-cart none-scroll-bar">
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

            <div className="form-pagination">
                <PaginationCustom total={meta?.totalIteams} />
            </div>
        </ManageCart>
    );
};

export default Cart;
