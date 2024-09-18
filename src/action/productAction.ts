"use server";

import { IDataGet, IProduct, IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";

export const handleAddProductService = async (
    dataBuider: FormData
): Promise<IRes<null>> => {
    return await axios.post(api.PRODUCT, dataBuider, {
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
    return axios.get(`/product?page=${page}&pageSize=${pageSize}&type=${type}`);
};

export const handleDeleteProductService = async (
    id: number
): Promise<IRes<null>> => {
    return axios.delete(`/product/${id}`, {
        withCredentials: true,
    });
};
