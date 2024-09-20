"use server";

import { IDataGet, IProduct, IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";
import handleParams from "@/helpers/handleParams";

export const handleAddProductService = async (
    dataBuider: FormData
): Promise<IRes<null>> => {
    return await axios.post(api.PRODUCT.DEFAULT, dataBuider, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const handleGetProductService = async ({
    page,
    pageSize,
    type,
}: {
    page: number;
    pageSize: number;
    type: number;
}): Promise<IRes<IDataGet<IProduct>>> => {
    return await axios.get(
        `${api.PRODUCT.DEFAULT}${handleParams({
            page: page,
            pageSize: pageSize,
            type: type,
        })}`
    );
};

export const handleDeleteProductService = async (
    id: number
): Promise<IRes<null>> => {
    return await axios.delete(`${api.PRODUCT.DEFAULT}/${id}`, {
        withCredentials: true,
    });
};

export const handleSearchProduct = async (
    textSearch: string
): Promise<IRes<IDataGet<IProduct>>> => {
    return await axios.get(
        `${api.PRODUCT.SEARCH}${handleParams({ textSearch: textSearch })}`
    );
};

export const handleSearchMoreProduct = async ({
    pageSize,
    page,
    textSearch,
}: {
    textSearch: string;
    page: number;
    pageSize: number;
}): Promise<IRes<IDataGet<IProduct>>> => {
    return await axios.get(
        `${api.PRODUCT.SEARCH}${handleParams({
            page: page,
            pageSize: pageSize,
            textSearch: textSearch,
        })}`
    );
};

export const handleGEtDetailProduct = async (
    id: number
): Promise<IRes<IProduct>> => {
    return await axios.get(`${api.PRODUCT.DETAIL}/${id}`);
};

interface IDataChange {
    id: number;
    count: number;
}
export const handleChangeCountCart = async (
    data: IDataChange
): Promise<IRes<null>> => {
    return await axios.put(`${api.PRODUCT.CHANGECART}`, data);
};
