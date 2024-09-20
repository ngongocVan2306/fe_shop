"use client";

import Image from "next/image";
import bunbu from "../../../public/bunbu.png";
import user from "../../../public/user.png";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import Categories from "../Categories/Categories";
import { Tooltip } from "antd";
import Link from "next/link";
import { routes } from "@/utils/menuRouters";
import { logout } from "@/store/feauture/authSlice";
import { ICate } from "@/utils/interface";
import { handleLogoutAction } from "@/action/authAction";
import { defaultPagination, resStatus } from "@/constants";
import iconCart from "../../../assets/icons/iconCart.svg";
import iconLogout from "../../../assets/icons/iconLogout.svg";
import { menuButtonAuth } from "@/utils/menuButtonAuth";
import FormSearch from "../Search/FormSearch";
import { useEffect } from "react";
import { handleCountCartServer } from "@/action/cartAction";
import { clearCart, startCart } from "@/store/feauture/cartSlice";
import { useRouter } from "next/navigation";

export default function Header({ data }: { data: ICate[] }) {
    const { isLogin, infoUser } = useAppSelector(
        (state: RootState) => state.auth
    );
    const carts = useAppSelector((state: RootState) => state.cart.count);

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const res = await handleCountCartServer(infoUser.id);
            if (res.code === resStatus.SUCCESS) {
                dispatch(startCart(res.data));
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = async () => {
        handleLogoutAction();
        dispatch(clearCart());
        dispatch(logout());
        router.push(routes.home.url);
    };

    return (
        <div className="w-[100%] h-[100%] flex justify-between items-center sm:px-[40px] px-[5px] shadow bg-[#fff]">
            <div className="sm:w-[10%] hidden sm:block">
                <Link href={routes.home.url + `/${defaultPagination.type}`}>
                    <Image
                        width={100}
                        height={100}
                        src={bunbu}
                        alt="logo"
                        className="hover:cursor-pointer sm:w-[100px] w-full"
                    />
                </Link>
            </div>

            <div className="flex justify-center items-center h-[100%] sm:w-[35%] w-[10%]">
                <Categories data={data} />
            </div>

            <div className="sm:w-[35%] w-[20%]">
                <FormSearch />
            </div>

            <div className="flex justify-center items-center sm:w-[15%] w-[45%]">
                <Link href={routes.cart.url + `?userId=${infoUser.id}`}>
                    <button className="relative">
                        <div className="w-[20px] h-[20px] rounded-[100%] bg-[red] text-[#fff] flex justify-center items-center absolute ml-[10px] mt-[-10px]">
                            <p>{carts} </p>
                        </div>

                        <Image
                            width={30}
                            height={30}
                            src={iconCart}
                            alt="cart"
                        />
                    </button>
                </Link>

                <Link href={routes.manageCate.url}>
                    <button className="border-solid border-[1px] border-[#ccc] p-[8px] rounded-[8px] mx-[10px]">
                        Admin
                    </button>
                </Link>

                <Tooltip
                    className="bg-[#fff] p-[0]"
                    trigger="click"
                    title={
                        <div className="min-h-[100px] w-[100px] bg-[#fff] rounded-[5px] flex flex-col justify-center items-center">
                            {isLogin ? (
                                <>
                                    <button
                                        className="w-[100%] h-[30px] border-none mt-[10px] rounded-[5px] flex justify-center items-center hover:bg-[#ddd]"
                                        onClick={() => handleLogout()}
                                    >
                                        <Image
                                            width={20}
                                            height={20}
                                            src={iconLogout}
                                            alt=""
                                            className="mr-[5px]"
                                        />
                                        <p className="text-[#000]"> Logout</p>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {menuButtonAuth.map((item, index) => {
                                        return (
                                            <Link href={item.url} key={index}>
                                                <button className="w-[100%] h-[30px] p-[5px] border-none mt-[10px] rounded-[5px] text-[#000] hover:bg-[#ddd]">
                                                    {item.label}
                                                </button>
                                            </Link>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    }
                >
                    <Image
                        width={100}
                        height={100}
                        src={infoUser.avatar ? infoUser.avatar : user}
                        alt="avatar"
                        className="object-contain w-[50px]"
                    />
                </Tooltip>

                <p className="hidden sm:block">
                    {infoUser.firstName + infoUser.lastName}
                </p>
            </div>
        </div>
    );
}
