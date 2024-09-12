"use server";

import { ICate, IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";

export const handleGetCateAction = async (): Promise<IRes<ICate[]>> => {
    return axios.get(api.CATE);
};

export const handleDeleteCateAction = async (
    id: number
): Promise<IRes<null>> => {
    return axios.delete(`${api.CATE}/${id}`);
};

export const handleCraeeteCateAction = async (
    name: string
): Promise<IRes<null>> => {
    return axios.post(api.CATE, { name: name }, { withCredentials: true });
};
