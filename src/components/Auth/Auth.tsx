"use client";

import React, { useRef } from "react";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { IUser } from "@/utils/interface";
import { routes } from "@/utils/menuRouters";
import { handleLoginAction, handleRegisterAction } from "@/action/authAction";
import Swal from "sweetalert2";
import { mesError, resStatus, toastStatus } from "@/constants";
import { loginSuccess } from "@/store/feauture/authSlice";
import { ButtonSubmit, DivMain } from "./Auth.styled";
import iconHome from "../../../assets/icons/iconHome.svg";
import Image from "next/image";
import FormGroup from "../FormGroup/FormGroup";
import { menuRegister } from "@/utils/menuRegister";
import LinkComponent from "../LinkComponent/LinkComponent";
import { useTranslation } from "react-i18next";

const Auth = ({ slug }: { slug: string }) => {
    const { t } = useTranslation("auth");

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

            if (res.code === resStatus.SUCCESS) {
                if (slug === routes.register.label) {
                    reset();
                    return;
                } else {
                    dispatch(loginSuccess(res.data?.user));
                    router.push(routes.home.url);
                }
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: toastStatus.ERROR,
                title: mesError,
            });
        }
    };

    return (
        <DivMain height="100vh" onKeyDown={handleKeyDown} tabIndex={0}>
            <div
                className="button-home"
                onClick={() => {
                    router.push(routes.home.url);
                }}
            >
                <Image
                    width={25}
                    height={25}
                    src={iconHome}
                    alt="home"
                    className="mr-[5px]"
                />

                <p>{t("home")}</p>
            </div>

            <div className="form-auth">
                <p className="heading">
                    {slug === routes.login.label ? t("login") : t("register")}
                </p>

                <form onSubmit={handleSubmit(handleAuth)}>
                    <FormGroup
                        label={t("email")}
                        name={menuRegister.email}
                        type="email"
                        register={register}
                        isRequired={true}
                        errors={errors}
                    />

                    {slug === routes.register.label && (
                        <>
                            <FormGroup
                                label={t("firstName")}
                                name={menuRegister.firstName}
                                type="text"
                                register={register}
                                isRequired={true}
                                errors={errors}
                            />
                            <FormGroup
                                label={t("lastName")}
                                name={menuRegister.lastName}
                                type="text"
                                register={register}
                                isRequired={true}
                                errors={errors}
                            />
                        </>
                    )}

                    <FormGroup
                        label={t("password")}
                        name={menuRegister.password}
                        type="password"
                        register={register}
                        isRequired={true}
                        min={8}
                        errors={errors}
                    />

                    {slug === routes.register.label && (
                        <FormGroup
                            label={t("rePassword")}
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

                    <ButtonSubmit
                        as="input"
                        type="submit"
                        width="50%"
                        value={
                            slug === routes.login.label
                                ? t("login")
                                : t("register")
                        }
                    />
                </form>

                <LinkComponent
                    href={
                        slug === routes.login.label
                            ? routes.register.url
                            : routes.login.url
                    }
                >
                    <p className=" label-swap">
                        {slug === routes.login.label
                            ? t("haveAccount")
                            : t("haveNotAccount")}
                    </p>
                </LinkComponent>
            </div>
        </DivMain>
    );
};

export default Auth;
