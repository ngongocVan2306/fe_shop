"use client";

import { IProduct } from "@/utils/interface";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import Swal from "sweetalert2";
import { mesError, resStatus, toastStatus } from "@/constants";
import { handleDeleteProductService } from "@/action/productAction";
import LinkComponent from "../../LinkComponent/LinkComponent";
import { routes } from "@/utils/menuRouters";
import { useState } from "react";
import ImageCustom from "../../ImageCustom/ImageCustom";
import { ButtonDelete, FormCard } from "./Card.styled";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("PRODUCT");

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
            <FormCard isShadow height="auto" width="200px">
                <div className="thumbnail">
                    <ImageCustom image={imageSrc} setImageSrc={setImageSrc} />
                </div>

                <div className="form-content">
                    <p className="truncate">{products.name}</p>

                    <p className="price">{handleFomatVnd(products.price)}</p>

                    <p>
                        {t("sold")} :
                        <span>{products.total - products.inventory}</span>
                    </p>

                    <p>
                        {t("inventory")} :<span>{products.inventory}</span>
                    </p>

                    {isAdmin ? (
                        <ButtonDelete
                            as="button"
                            width="50%"
                            onClick={(e) => {
                                !isLoading
                                    ? handleDeleteProduct(e, products)
                                    : null;
                            }}
                        >
                            {t("delete")}
                        </ButtonDelete>
                    ) : (
                        <></>
                    )}
                </div>
            </FormCard>
        </LinkComponent>
    );
};

export default Card;
