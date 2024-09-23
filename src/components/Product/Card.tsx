"use client";

import Image from "next/image";
import { IProduct } from "@/utils/interface";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import Swal from "sweetalert2";
import { mesError, resStatus, toastStatus } from "@/constants";
import { handleDeleteProductService } from "@/action/productAction";
import LinkComponent from "../LinkComponent/LinkComponent";
import { routes } from "@/utils/menuRouters";
import { useState } from "react";
import imageDefault from "../../../public/imageDefault.png";

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
                        // setReload(!reload);
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
            <div
                className="border-solid border-[1px] border-[#ccc] rounded-[10px] shadow hover:cursor-pointer hover:opacity-[0.6]"
                key={products.id}
            >
                <div className="w-full h-[200px] overflow-hidden">
                    <Image
                        width={100}
                        height={100}
                        className="w-full object-contain rounded-[10px]"
                        src={imageSrc}
                        alt="image"
                        onError={() => setImageSrc(imageDefault.src)}
                    />
                </div>

                <div className="p-[10px]">
                    <h5 className="truncate"> {products.name}</h5>
                    <h5 className="text-[var(--color-price)]">
                        {handleFomatVnd(products.price)}
                    </h5>
                    <h5>
                        Đã bán :{" "}
                        <span>{products.total - products.inventory}</span>
                    </h5>
                    <h5>
                        Kho còn : <span>{products.inventory}</span>
                    </h5>

                    {isAdmin ? (
                        <button
                            className="bg-[red] text-[#fff] w-[50%] p-[4px] rounded-[10px] shadow hover:opacity-[0.6] mt-[10px]"
                            onClick={(e) => {
                                !isLoading
                                    ? handleDeleteProduct(e, products)
                                    : null;
                            }}
                        >
                            Xóa
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </LinkComponent>
    );
};

export default Card;
