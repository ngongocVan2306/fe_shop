"use client";

import { IProduct } from "@/utils/interface";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/menuRouters";
import Swal from "sweetalert2";
import { resStatus, toastStatus } from "@/constants";
import { handleAddToCartService } from "@/action/cartAction";
import { AddCart } from "@/store/feauture/cartSlice";
import { Button, FormFlex } from "./DetailProduct.styled";
import { Div } from "@/components/StyledComponents/Div";
import PreviewImage from "@/components/PreviewImage/PreviewImage";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import iconCart from "../../../../assets/icons/iconCart.svg";
import Image from "next/image";
import Quantity from "@/components/Quantity/Quantity";

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
                title: "Bạn vui lòng chọn sô lượng!",
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
            title: "Bạn có chắc muốn thêm sản phẩm này vào giỏ hàng?",
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
        <FormFlex height="var(--height-content)" className="form-main">
            <FormFlex
                className="form-detail"
                isShadow
                width="70%"
                height="auto"
            >
                <Div width="40%">
                    <PreviewImage
                        data={product?.imageData.map((item) => item.img_url)}
                        isFile={false}
                    />
                </Div>

                <div className="content-detail">
                    <p>{product.name}</p>

                    <div className="form-price">
                        <p className="price">{handleFomatVnd(product.price)}</p>
                    </div>

                    <FormFlex className="inventory">
                        <p>
                            Đã Bán:{" "}
                            <span> {product?.total - product?.inventory}</span>
                        </p>

                        <p style={{ color: "#ccc" }}>|</p>

                        <p>
                            Trong kho còn: <span> {product?.inventory}</span>
                        </p>
                    </FormFlex>

                    <FormFlex className="quantity">
                        <p className="label-quantity">Số lượng:</p>
                        <Quantity
                            inventory={product.inventory}
                            count={count}
                            setCount={setCount}
                        />
                    </FormFlex>

                    <FormFlex className="button-group">
                        <Button
                            className="button-add"
                            as="button"
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
                            Thêm vào giỏ hàng
                        </Button>

                        <Button className="button-buy" as="button">
                            Mua ngay
                        </Button>
                    </FormFlex>
                </div>
            </FormFlex>
        </FormFlex>
    );
}
