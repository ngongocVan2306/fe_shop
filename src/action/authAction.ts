"use server";

import { IRes, IResLogin, IUser } from "@/utils/interface";

export const handleRegisterAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IUser>> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify({
                email: dataBuider.email,
                firstName: dataBuider.firstName,
                lastName: dataBuider.lastName,
                password: dataBuider.password,
            }),
            cache: "no-store",
        }
    );
    const data = await res.json();
    return data;
};

export const handleLoginAction = async (
    dataBuider: Partial<IUser>
): Promise<IRes<IResLogin>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: dataBuider.email,
            password: dataBuider.password,
        }),
        cache: "no-store",
        credentials: "include",
    });
    const data = await res.json();
    return data;
};

export const handleLogoutAction = async (): Promise<IRes<null>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
    });
    const data = await res.json();
    return data;
};
