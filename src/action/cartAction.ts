"use server";

import { ICart, IDataGet, IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";
import handleParams from "@/helpers/handleParams";
import { handleGetToken } from "@/helpers/handleGetToken";

export const handleGetCartService = async ({
    page,
    pageSize,
}: {
    page: number;
    pageSize: number;
}): Promise<IRes<IDataGet<ICart>>> => {
    return await axios.get(
        `${api.PRODUCT.CART}${handleParams({
            page: page,
            pageSize: pageSize,
        })}`,
        handleGetToken()
    );
};

export const handleCountCartServer = async (): Promise<IRes<number>> => {
    return await axios.get(`${api.PRODUCT.COUTCART}`, handleGetToken());
};

export const handleDeleteCartService = async (
    id: number
): Promise<IRes<null>> => {
    return await axios.delete(`${api.PRODUCT.CART}/${id}`, handleGetToken());
};

export const handleAddToCartService = async ({
    id,
    count,
}: {
    id: number;
    count: number;
}): Promise<IRes<null>> => {
    return await axios.post(
        `${api.PRODUCT.ADDCART}`,
        {
            product_id: id,
            count: count,
        },
        handleGetToken()
    );
};

interface IDataChange {
    id: number;
    count: number;
}
export const handleChangeCountCart = async (
    data: IDataChange
): Promise<IRes<null>> => {
    return await axios.put(`${api.PRODUCT.CHANGECART}`, data, handleGetToken());
};
