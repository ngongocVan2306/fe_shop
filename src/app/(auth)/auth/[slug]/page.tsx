"use client";

import { routes } from "@/utils/menuRouters";
// import Link from "next/link";
import { useEffect, useRef } from "react";
import thumbnail from "../../../../../public/hero-bg.jpg";
import { IUser } from "@/utils/interface";
import { handleLoginAction, handleRegisterAction } from "@/action/authAction";
import Swal from "sweetalert2";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/feauture/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import FormGroup from "@/components/FormGroup/FormGroup";
import LinkComponent from "@/components/LinkComponent/LinkComponent";
import { menuRegister } from "@/utils/menuRegister";

export default function PageRegister({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const isLogin = useAppSelector((state: RootState) => state.auth.isLogin);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const ref = useRef<HTMLButtonElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            console.log("run");
            ref.current?.click();
        }
    };

    useEffect(() => {
        if (isLogin) {
            router.push(routes.home.url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const handleRegister = async (data: FieldValues) => {
        try {
            const dataBuider: Partial<IUser> = {
                ...data,
            };
            const res = await handleRegisterAction(dataBuider);
            Swal.fire({
                icon: res.code === 200 ? "success" : "warning",
                title: res.msg,
            });
            if (res.code === 200) {
                setValue(menuRegister.email, "");
                setValue(menuRegister.firstName, "");
                setValue(menuRegister.lastName, "");
                setValue(menuRegister.password, "");
                setValue(menuRegister.rePassword, "");
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error",
            });
        }
    };

    const handleLogin = async (data: FieldValues) => {
        try {
            const dataBuider: Partial<IUser> = {
                ...data,
            };
            const res = await handleLoginAction(dataBuider);
            Swal.fire({
                icon: res.code === 200 ? "success" : "warning",
                title: res.msg,
            });
            if (res.code === 200) {
                dispatch(loginSuccess(res.data.user));
                router.push(routes.home.url);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "warning",
                title: "error",
            });
        }
    };

    return (
        <div
            className="w-[100vw] h-[100vh]  overflow-auto py-[40px] relative"
            style={{ backgroundImage: `url(${thumbnail.src})` }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div
                className="ml-[20px] z-[100] w-[100px] h-[50px] bg-gradient-to-r from-[#74ebd5] to-[#9face6] rounded-[100px] flex justify-center items-center cursor-pointer hover:opacity-[0.6] fixed top-[10px] left-[10px]"
                onClick={() => {
                    router.push(routes.home.url);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5  text-[#fff] mr-[10px]"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                </svg>

                <p className="text-[#fff]">Home</p>
            </div>

            <div className="form-login md:w-[40%] w-[90%] bg-[#fff] ml-[50%] translate-x-[-50%] rounded-[10px] shadow-lg pt-[20px] px-[40px] pb-[30px] mt-[40px]">
                <p className="text-center text-[25px] font-[600]">
                    {slug === routes.login.label ? "Login" : "Register"}
                </p>

                <form
                    onSubmit={handleSubmit(
                        slug === routes.register.label
                            ? handleRegister
                            : handleLogin
                    )}
                    className="w-full flex flex-col justify-center items-center"
                >
                    <FormGroup
                        label="Email"
                        name={menuRegister.email}
                        type="email"
                        register={register}
                        rules={{ required: "Email không được để trống" }}
                        errors={errors}
                    />

                    {slug === routes.register.label && (
                        <>
                            {" "}
                            <FormGroup
                                label="First Name"
                                name={menuRegister.firstName}
                                type="text"
                                register={register}
                                rules={{
                                    required: "Firstname không được để trống",
                                }}
                                errors={errors}
                            />
                            <FormGroup
                                label="Last Name"
                                name={menuRegister.lastName}
                                type="text"
                                register={register}
                                rules={{
                                    required: "Lastname không được để trống",
                                }}
                                errors={errors}
                            />
                        </>
                    )}

                    <FormGroup
                        label="Password"
                        name={menuRegister.password}
                        type="password"
                        register={register}
                        rules={{
                            required: "Password không được để trống",
                            minLength: 8,
                        }}
                        errors={errors}
                    />

                    {slug === routes.register.label && (
                        <FormGroup
                            label="Re-Password"
                            name={menuRegister.rePassword}
                            type="password"
                            register={register}
                            rules={{
                                required: "re-password Không được đẻ trống",
                                minLength: 8,
                                validate: (value: string) =>
                                    value === getValues("password") ||
                                    "re-password phải giống password",
                            }}
                            errors={errors}
                        />
                    )}

                    <input
                        type="submit"
                        className="mt-[20px] w-[70%] py-[8px]  bg-[#ccc] rounded-full cursor-pointer hover:opacity-[0.6] bg-gradient-to-r from-[#74ebd5] to-[#9face6] border-none text-[#fff]"
                    />
                </form>

                <div className="mt-[20px]">
                    <LinkComponent
                        href={
                            slug === routes.login.label
                                ? routes.register.url
                                : routes.login.url
                        }
                    >
                        {slug === routes.login.label
                            ? "You haven't an account ?"
                            : "You have an account ?"}
                    </LinkComponent>
                </div>
            </div>
        </div>
    );
}
