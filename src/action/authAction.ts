"use server";

import { IRes, IResLogin, IUser } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";

export const handleRegisterAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IResLogin>> => {
    return await axios.post(api.REGISTER, dataBuider, {
        withCredentials: true,
    });
};

export const handleLoginAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IResLogin>> => {
    return await axios.post(api.LOGIN, dataBuider, { withCredentials: true });
};

export const handleLogoutAction = async (): Promise<IRes<null>> => {
    return await axios.post(api.LOGOUT);
};
