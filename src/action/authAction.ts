"use server";

import { IRes, IResLogin, IUser } from "@/utils/interface";
import axios from "../helpers/axios";
import { api } from "@/constants";
import { cookies } from "next/headers";
import { handleGetToken } from "@/helpers/handleGetToken";

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
    const res: IRes<IResLogin> = await axios.post(api.LOGIN, dataBuider, {
        withCredentials: true,
    });

    cookies().set("access_token", res.data.tokens.access_token, {
        maxAge: 10,
    });
    cookies().set("refresh_token", res.data.tokens.refresh_token, {
        maxAge: 12 * 30 * 24 * 60 * 60 * 1000,
    });

    return res;
};

export const handleLogoutAction = async (): Promise<IRes<null>> => {
    cookies().delete("access_token");
    cookies().delete("refresh_token");
    return await axios.post(api.LOGOUT);
};

export const handleRefreshToken = async (): Promise<IRes<string>> => {
    const res: IRes<string> = await axios.get(
        api.REFRESHTOKEN,
        handleGetToken(true)
    );

    cookies().set("access_token", res.data, { maxAge: 10 });

    return res;
};
