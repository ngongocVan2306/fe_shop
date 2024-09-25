"use client";

import { handleGetCartService } from "@/action/cartAction";
import usePagination from "@/hook/usePagination";

import { ICart } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { Empty } from "antd";
import { useState } from "react";
import PaginationCustom from "../PaginationCustom/PaginationCustom";
import CartItem from "./CartItem";
import { DivFlex, DivStyled } from "@/styledComponent/Div";

const Cart = () => {
    const [reload, setReload] = useState<boolean>(false);

    const { isLoading, carts, meta } = usePagination({
        api: handleGetCartService,
        is_reload: reload,
    });

    return (
        <DivStyled height="100vh" padding="20px" background="#f4f4f4">
            <DivFlex
                maxHeight="80vh"
                overflow="auto"
                background="#fff"
                isShadow
                rounded="10px"
                align="start"
            >
                <DivStyled padding="20px">
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
                </DivStyled>
            </DivFlex>

            <DivFlex marginTop="40px" background="#f4f4f4">
                <PaginationCustom total={meta?.totalIteams} />
            </DivFlex>
        </DivStyled>
    );
};

export default Cart;
