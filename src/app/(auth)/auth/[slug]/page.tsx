"use client";

import { routes } from "@/utils/menuRouters";
import { useRef } from "react";
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
import { DivFlex, DivGradient, DivStyled } from "@/styledComponent/Div";
import { TextStyled } from "@/styledComponent/TextStyled";
import { InputGradient } from "@/styledComponent/InputStyled";

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
        <DivStyled
            isThumbnail={true}
            height="100vh"
            width="100%"
            overflow="auto"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="none-scroll-bar"
        >
            {/* Start Button Home */}

            <DivGradient
                height="50px"
                width="100px"
                marginTop="20px"
                overflow="auto"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                rounded="100px"
                margin="20px"
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
                <TextStyled color="#fff">Home</TextStyled>
            </DivGradient>

            {/* End Button Home */}

            {/* Start form Action */}

            <DivFlex
                background="rgba(255, 0, 0,0)"
                marginTop="60px"
                className="none-scroll-bar"
            >
                <DivStyled
                    width="40%"
                    background="#fff"
                    rounded="10px"
                    padding="20px"
                    overflow="hidden"
                >
                    <TextStyled textAlign="center" size="25px" weight={600}>
                        {slug === routes.login.label ? "Login" : "Register"}
                    </TextStyled>

                    <DivFlex
                        width="100%"
                        flexDirection="column"
                        as="form"
                        onSubmit={handleSubmit(handleAuth)}
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

                        <InputGradient type="submit" size="70%" round="100px" />
                    </DivFlex>

                    <DivStyled marginTop="20px">
                        <LinkComponent
                            href={
                                slug === routes.login.label
                                    ? routes.register.url
                                    : routes.login.url
                            }
                        >
                            <TextStyled>
                                {slug === routes.login.label
                                    ? "You haven't an account ?"
                                    : "You have an account ?"}
                            </TextStyled>
                        </LinkComponent>
                    </DivStyled>
                </DivStyled>
            </DivFlex>

            {/* End form Action */}
        </DivStyled>
    );
};

export default PageRegister;
