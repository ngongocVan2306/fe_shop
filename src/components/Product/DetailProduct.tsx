"use client";

import { IProduct } from "@/utils/interface";
import PreviewImage from "../PreviewImage/PreviewImage";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import Image from "next/image";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/menuRouters";
import Swal from "sweetalert2";
import { resStatus, toastStatus } from "@/constants";
import { handleAddToCartService } from "@/action/cartAction";
import { AddCart } from "@/store/feauture/cartSlice";
import iconCart from "../../../assets/icons/iconCart.svg";
import Quantity from "../Quantity/Quantity";
import { DivFlex, DivStyled } from "@/styledComponent/Div";
import { TextStyled } from "@/styledComponent/TextStyled";
import { ButtonFlex, ButtonStyled } from "@/styledComponent/ButtonStyled";

export default function DetailProduct({ product }: { product: IProduct }) {
    const [count, setCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isLogin = useAppSelector((state: RootState) => state.auth.isLogin);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleValidate = () => {
        if (!isLogin) {
            router.push(routes.login.url);
            return;
        }
        if (!count) {
            Swal.fire({
                icon: toastStatus.INFO,
                title: "Bạn vui lòng chọn sô lượng !",
            });
            return false;
        }
        return true;
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        const isValid = handleValidate();
        if (!isValid) {
            setIsLoading(false);
            return;
        }

        Swal.fire({
            icon: toastStatus.QUESTION,
            title: "Bạn có chắc muốn thêm sản phẩm này vào giỏ hàng ?",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await handleAddToCartService({
                    id: product.id,
                    count: count,
                });

                Swal.fire({
                    icon:
                        res.code === resStatus.SUCCESS
                            ? toastStatus.SUCCESS
                            : toastStatus.WARNING,
                    title: res.msg,
                });

                if (res.code === resStatus.SUCCESS) {
                    setCount(0);
                    dispatch(AddCart());
                }
            }
        });

        setIsLoading(false);
    };
    return (
        <DivFlex background="#f4f4f4" height="100vh">
            <DivFlex width="70%" padding="20px" rounded="5px" isShadow>
                <DivStyled width="40%" padding="20px">
                    <PreviewImage
                        data={product?.imageData.map((item) => item.img_url)}
                        isFile={false}
                    />
                </DivStyled>

                <DivFlex width="60%" padding="20px" flexDirection="column">
                    <TextStyled size="20px" weight={500}>
                        {product?.name}
                    </TextStyled>

                    <DivStyled
                        background="#f4f4f4"
                        rounded="10px"
                        padding="10px"
                        marginTop="20px"
                    >
                        <TextStyled size="20px" color="var(--color-price)">
                            {handleFomatVnd(product?.price)}
                        </TextStyled>
                    </DivStyled>

                    <DivFlex marginTop="20px" justyfy="space-between">
                        <TextStyled>
                            Đã Bán :{" "}
                            <TextStyled as="span">
                                {product?.total - product?.inventory}
                            </TextStyled>
                        </TextStyled>

                        <TextStyled color="#ccc">|</TextStyled>

                        <TextStyled>
                            Trong kho còn :{" "}
                            <TextStyled as="span">
                                {product?.inventory}
                            </TextStyled>
                        </TextStyled>
                    </DivFlex>

                    <DivFlex marginTop="20px" justyfy="start">
                        <TextStyled>Số lượng :</TextStyled>
                        <Quantity
                            inventory={product.inventory}
                            count={count}
                            setCount={setCount}
                        />
                    </DivFlex>

                    <DivFlex marginTop="80px" justyfy="space-between">
                        <ButtonFlex
                            height="50px"
                            width="45%"
                            colorBorder="var(--color-cart)"
                            background="var(--color-button-cart)"
                            color="var(--color-cart)"
                            onClick={() =>
                                !isLoading ? handleAddToCart() : null
                            }
                        >
                            <Image
                                width={20}
                                height={20}
                                src={iconCart}
                                alt="cart"
                                className="mr-[5px]"
                            />
                            <p>Thêm Vào Giỏ Hàng</p>
                        </ButtonFlex>

                        <ButtonStyled
                            height="50px"
                            width="45%"
                            colorBorder="var(--color-cart)"
                            background="var(--color-cart)"
                            color="#fff"
                        >
                            Mua Ngay
                        </ButtonStyled>
                    </DivFlex>
                </DivFlex>
            </DivFlex>
        </DivFlex>
    );
}
