"use client";

import { routes } from "@/utils/menuRouters";
import { useRef } from "react";
import thumbnail from "../../../../../public/hero-bg.jpg";
import { IUser } from "@/utils/interface";
import { handleLoginAction, handleRegisterAction } from "@/action/authAction";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/feauture/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import FormGroup from "@/components/FormGroup/FormGroup";
import LinkComponent from "@/components/LinkComponent/LinkComponent";
import { menuRegister } from "@/utils/menuRegister";
import { mesError, resStatus, toastStatus } from "@/constants";
import Image from "next/image";
import iconHome from "../../../../../assets/icons/iconHome.svg";

const PageRegister = ({ params: { slug } }: { params: { slug: string } }) => {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const ref = useRef<HTMLButtonElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            ref.current?.click();
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm();

    const handleAuth = async (data: FieldValues) => {
        try {
            const dataBuider: Partial<IUser> = {
                ...data,
            };

            const res =
                slug === routes.register.label
                    ? await handleRegisterAction(dataBuider)
                    : await handleLoginAction(dataBuider);

            Swal.fire({
                icon:
                    res.code === resStatus.SUCCESS
                        ? toastStatus.SUCCESS
                        : toastStatus.WARNING,
                title: res.msg,
            });

            if (
                res.code === resStatus.SUCCESS &&
                slug === routes.register.label
            ) {
                reset();
                return;
            }

            dispatch(loginSuccess(res.data?.user));
            router.push(routes.home.url);
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: toastStatus.ERROR,
                title: mesError,
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
                <Image width={30} height={30} src={iconHome} alt="home" />

                <p className="text-[#fff]">Home</p>
            </div>

            <div className="form-login md:w-[40%] w-[90%] bg-[#fff] ml-[50%] translate-x-[-50%] rounded-[10px] shadow-lg pt-[20px] px-[40px] pb-[30px] mt-[40px]">
                <p className="text-center text-[25px] font-[600]">
                    {slug === routes.login.label ? "Login" : "Register"}
                </p>

                <form
                    onSubmit={handleSubmit(handleAuth)}
                    className="w-full flex flex-col justify-center items-center"
                >
                    <FormGroup
                        label="Email"
                        name={menuRegister.email}
                        type="email"
                        register={register}
                        isRequired={true}
                        errors={errors}
                    />

                    {slug === routes.register.label && (
                        <>
                            <FormGroup
                                label="First Name"
                                name={menuRegister.firstName}
                                type="text"
                                register={register}
                                isRequired={true}
                                errors={errors}
                            />
                            <FormGroup
                                label="Last Name"
                                name={menuRegister.lastName}
                                type="text"
                                register={register}
                                isRequired={true}
                                errors={errors}
                            />
                        </>
                    )}

                    <FormGroup
                        label="Password"
                        name={menuRegister.password}
                        type="password"
                        register={register}
                        isRequired={true}
                        min={8}
                        errors={errors}
                    />

                    {slug === routes.register.label && (
                        <FormGroup
                            label="Re-Password"
                            name={menuRegister.rePassword}
                            type="password"
                            register={register}
                            isRequired={true}
                            min={8}
                            isRePassword={true}
                            getValues={getValues}
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
};

export default PageRegister;
