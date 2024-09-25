"use client";

import { IProduct } from "@/utils/interface";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import Swal from "sweetalert2";
import { mesError, resStatus, toastStatus } from "@/constants";
import { handleDeleteProductService } from "@/action/productAction";
import LinkComponent from "../LinkComponent/LinkComponent";
import { routes } from "@/utils/menuRouters";
import { useState } from "react";
import ImageCustom from "../ImageCustom/ImageCustom";
import { DivStyled } from "@/styledComponent/Div";
import { TextStyled, TextTruncate } from "@/styledComponent/TextStyled";
import { ButtonStyled } from "@/styledComponent/ButtonStyled";

const Card = ({
    products,
    isAdmin,
    handleReload,
    isLoading,
}: {
    products: IProduct;
    isAdmin: boolean;
    handleReload: () => void;
    isLoading: boolean;
}) => {
    const [imageSrc, setImageSrc] = useState(
        process.env.NEXT_PUBLIC_BASE_IMAGE + products?.imageData[0]?.img_url
    );

    const handleDeleteProduct = (e: React.MouseEvent, product: IProduct) => {
        if (e && e.stopPropagation) {
            e.preventDefault();
            e.stopPropagation();
        }

        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `Bạn có chắc muốn xóa ${product.name} không?`,
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await handleDeleteProductService(product.id);
                    if (res.code === resStatus.SUCCESS) {
                        handleReload();
                    }
                    Swal.fire({
                        icon:
                            res.code === resStatus.SUCCESS
                                ? toastStatus.SUCCESS
                                : toastStatus.WARNING,
                        title: res.msg,
                    });
                } catch (err) {
                    console.log(err);
                    Swal.fire({
                        icon: toastStatus.ERROR,
                        title: mesError,
                    });
                }
            }
        });
    };
    return (
        <LinkComponent key={products.id} href={routes.detail.url + products.id}>
            <DivStyled
                width="240px"
                colorBorder="#ddd"
                isShadow
                overflow="hidden"
                rounded="10px"
            >
                <DivStyled height="200px" overflow="hidden">
                    <ImageCustom image={imageSrc} setImageSrc={setImageSrc} />
                </DivStyled>

                <DivStyled padding="10px">
                    <TextTruncate>{products.name}</TextTruncate>
                    <TextStyled color="var(--color-price)">
                        {handleFomatVnd(products.price)}
                    </TextStyled>

                    <TextStyled>
                        Đã bán :
                        <TextStyled as="span">
                            {products.total - products.inventory}
                        </TextStyled>
                    </TextStyled>

                    <TextStyled>
                        Kho còn :
                        <TextStyled as="span">{products.inventory}</TextStyled>
                    </TextStyled>

                    {isAdmin ? (
                        <ButtonStyled
                            color="#fff"
                            background="red"
                            width="50%"
                            padding="8px"
                            onClick={(e) => {
                                !isLoading
                                    ? handleDeleteProduct(e, products)
                                    : null;
                            }}
                        >
                            Xóa
                        </ButtonStyled>
                    ) : (
                        <></>
                    )}
                </DivStyled>
            </DivStyled>
        </LinkComponent>
    );
};

export default Card;
