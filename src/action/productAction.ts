"use server";

import { IDataGet, IProduct, IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";

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
        `${api.PRODUCT.DEFAULT}?page=${page}&pageSize=${pageSize}&type=${type}`
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
): Promise<IRes<IProduct[]>> => {
    return axios.get(`${api.PRODUCT.SEARCH}${textSearch}`);
};
