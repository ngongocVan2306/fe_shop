"use server";

import { ICart, IDataGet, IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";
import handleParams from "@/helpers/handleParams";

export const handleGetCartService = async ({
    page,
    pageSize,
    userId,
}: {
    page: number;
    pageSize: number;
    userId: number;
}): Promise<IRes<IDataGet<ICart>>> => {
    return await axios.get(
        `${api.PRODUCT.CART}${handleParams({
            page: page,
            pageSize: pageSize,
            userId: userId,
        })}`
    );
};

export const handleCountCartServer = async (
    id: number
): Promise<IRes<number>> => {
    return await axios.get(`${api.PRODUCT.COUTCART}/${id}`);
};

export const handleDeleteCartService = async (
    id: number
): Promise<IRes<null>> => {
    return await axios.delete(`${api.PRODUCT.CART}/${id}`);
};

export const handleAddToCartService = async ({
    id,
    count,
    userId,
}: {
    id: number;
    count: number;
    userId: number;
}): Promise<IRes<null>> => {
    return await axios.post(
        `${api.PRODUCT.ADDCART}`,
        {
            user_id: userId,
            product_id: id,
            count: count,
        },
        { withCredentials: true }
    );
};
