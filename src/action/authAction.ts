"use server";

import { IRes, IResLogin, IUser } from "@/utils/interface";
import axios from "../helpers/axios";
import { api, maxAge } from "@/constants";
import { cookies } from "next/headers";

export const handleRegisterAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IResLogin>> => {
    console.log("register", dataBuider);
    return await axios.post(api.REGISTER, dataBuider, {
        withCredentials: true,
    });
};

export const handleLoginAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IResLogin>> => {
    const res: IRes<IResLogin> = await axios.post(api.LOGIN, dataBuider);

    cookies().set("access_token", res.data.tokens.access_token, {
        maxAge: maxAge.maxAgeAccess,
    });
    cookies().set("refresh_token", res.data.tokens.refresh_token, {
        maxAge: maxAge.maxAgeRefresh,
    });

    return res;
};

export const handleLogoutAction = async (): Promise<IRes<null>> => {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return await axios.post(api.LOGOUT);
};

export const handleRefreshToken = async (): Promise<IRes<string>> => {
    const res: IRes<string> = await axios.get(api.REFRESHTOKEN);

    cookies().set("access_token", res.data, { maxAge: maxAge.maxAgeAccess });

    return res;
};
