"use client";

import { IProduct } from "@/utils/interface";
import PreviewImage from "../PreviewImage/PreviewImage";
import { handleFomatVnd } from "@/helpers/handleFormatVnd";

export default function DetailProduct({ product }: { product: IProduct }) {
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
                </div>
            </div>
        </div>
    );
}
