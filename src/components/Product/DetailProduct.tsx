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
        <div className="w-full h-[100vh] bg-[#f4f4f4] flex justify-center items-center">
            <div className="sm:w-[70%] w-full bg-[#fff] flex sm:flex-row flex-col justify-center py-[40px] sm:px-[100px] rounded-[5px] shadow">
                <div className="sm:w-[40%] w-full h-full pt-[40px]">
                    <PreviewImage
                        data={product?.imageData.map((item) => item.img_url)}
                        isFile={false}
                    />
                </div>

                <div className="sm:w-[60%] w-full sm:px-[40px] px-[10px] py-[20px] flex flex-col">
                    <h4 className="text-[20px]">{product?.name}</h4>

                    <div className="w-full bg-[#f4f4f4] rounded-[5px] p-[10px] mt-[20px]">
                        <h5 className="text-[20px] text-[var(--color-price)]">
                            {handleFomatVnd(product?.price)}
                        </h5>
                    </div>

                    <div className="w-[100%] flex justify-between items-center mt-[20px]">
                        <h5>
                            Đã Bán :{" "}
                            <span>{product?.total - product?.inventory}</span>
                        </h5>

                        <h5 className="text-[#ccc]">|</h5>

                        <h5>
                            Trong kho còn : <span>{product?.inventory}</span>
                        </h5>
                    </div>

                    <div className="w-full flex items-center mt-[20px]">
                        <h5 className="mr-[20px] ">Số lượng :</h5>

                        <Quantity
                            inventory={product.inventory}
                            count={count}
                            setCount={setCount}
                        />
                    </div>

                    <div className="flex items-center mt-[80px] ">
                        <button
                            className="h-[50px] flex justify-center items-center sm:w-[45%] w-[50%] border-solid border-[1px] border-[var(--color-cart)] bg-[var(--color-button-cart)] text-[var(--color-cart)] sm:p-[10px] rounded-[5px] shadow hover:opacity-[0.6]"
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
                        </button>
                        <button className="h-[50px] bg-[var(--color-cart)] sm:w-[45%] w-[50%] text-[#fff] sm:px-[50px] py-[10px] rounded-[5px] shadow hover:opacity-[0.6] ml-[50px]">
                            Mua Ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
