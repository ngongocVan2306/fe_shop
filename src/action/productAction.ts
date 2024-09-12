"use server";

import { IRes } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";

export const handleAddProductService = async (
    dataBuider: FormData
): Promise<IRes<null>> => {
    return axios.post(api.PRODUCT, dataBuider, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
