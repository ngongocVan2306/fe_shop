"use server";

import { IRes, IResLogin, IUser } from "@/utils/interface";
import axios from "../helpers/axios";

export const handleRegisterAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IUser>> => {
    return axios.post("/user/register", dataBuider, {
        withCredentials: true,
    });
};

export const handleLoginAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IResLogin>> => {
    return axios.post("/user/login", dataBuider, { withCredentials: true });
};

export const handleLogoutAction = async (): Promise<IRes<null>> => {
    return axios.post("/user/logout");
};
