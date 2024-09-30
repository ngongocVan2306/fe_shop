"use client";

import { ICart } from "@/utils/interface";
import Quantity from "../Quantity/Quantity";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import Swal from "sweetalert2";
import { resStatus, toastStatus } from "@/constants";
import { handleDeleteCartService } from "@/action/cartAction";
import { DeleteCart } from "@/store/feauture/cartSlice";
import { useAppDispatch } from "@/store/store";
import { useState } from "react";
import ImageCustom from "../ImageCustom/ImageCustom";
import { useTranslation } from "react-i18next";

const CartItem = ({
    cart,
    isLoading,
    handleReload,
}: {
    cart: ICart;
    isLoading: boolean;
    handleReload: () => void;
}) => {
    const { t } = useTranslation("cart");

    const [imageSrc, setImageSrc] = useState(
        process.env.NEXT_PUBLIC_BASE_IMAGE +
            cart?.productData.imageData[0]?.img_url
    );
    const dispatch = useAppDispatch();

    const handleDeleteCart = async (cart: ICart) => {
        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `${t("questiondelete")} ${cart.productData.name} ?`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await handleDeleteCartService(cart.id);

                if (res.code === resStatus.SUCCESS) {
                    handleReload();
                    dispatch(DeleteCart());
                }

                Swal.fire({
                    icon:
                        res.code === resStatus.SUCCESS
                            ? toastStatus.SUCCESS
                            : toastStatus.WARNING,
                    title: res.msg,
                });
            }
        });
    };

    return (
        <div className="sm:flex sm:justify-center w-full border-solid border-b-[1px] border-[#ccc] py-[20px] grid grid-cols-2 gap-4">
            <div className="sm:w-[10%]">
                <ImageCustom image={imageSrc} setImageSrc={setImageSrc} />
            </div>

            <div className="w-[70%] ml-[20px] border-solid sm:border-r-[1px] border-[#ccc]">
                <h5 className="font-[600] text-[16px]">
                    {cart.productData.name}
                </h5>

                <div className="w-[50%] my-[20px]">
                    <Quantity
                        count={cart.count}
                        inventory={cart.productData.inventory}
                        isDetail={false}
                        id={cart.id}
                        handleReload={() => handleReload()}
                    />
                </div>

                <h5>
                    {t("price")}
                    <span className="text-[var(--color-price)]">
                        {handleFomatVnd(cart.count * cart.productData.price)}
                    </span>
                </h5>
            </div>

            <div className="sm:w-[20%] flex sm:flex-col flex-row justify-around items-center p-[10px] col-span-2">
                <button
                    className="sm:w-[100%] w-[45%] bg-[red] p-[4px] rounded-[10px] shadow text-[#fff] hover:opacity-[0.6]"
                    onClick={() => (!isLoading ? handleDeleteCart(cart) : null)}
                >
                    {t("delete")}
                </button>
                <button className="sm:w-[100%] w-[45%] bg-[blue] p-[4px] rounded-[10px] shadow text-[#fff] hover:opacity-[0.6]">
                    {t("buy")}{" "}
                </button>
            </div>
        </div>
    );
};

export default CartItem;
