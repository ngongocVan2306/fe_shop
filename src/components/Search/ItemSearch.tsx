"use client";

import { handleFomatVnd } from "@/helpers/handleFormatVnd";
import { IProduct } from "@/utils/interface";
import { useState } from "react";
import ImageCustom from "../ImageCustom/ImageCustom";

const ItemSearch = ({
    product,
    handleChooseItem,
}: {
    product: IProduct;
    handleChooseItem: () => void;
}) => {
    const [imageSrc, setImageSrc] = useState(
        process.env.NEXT_PUBLIC_BASE_IMAGE + product.imageData[0].img_url
    );
    return (
        <div
            className="flex justify-start p-[5px] hover:cursor-pointer hover:bg-[#f4f4f4]"
            onClick={() => handleChooseItem()}
        >
            <div className="w-[20%]">
                <ImageCustom image={imageSrc} setImageSrc={setImageSrc} />
            </div>

            <div className="ml-[40px] flex flex-col justify-center w-[70%]">
                <h5 className="font-[600] truncate w-[100%]">{product.name}</h5>
                <h5>
                    Đơn giá :{" "}
                    <span className="text-[var(--color-price)] ">
                        {" "}
                        {handleFomatVnd(product.price)}
                    </span>
                </h5>
            </div>
        </div>
    );
};

export default ItemSearch;
