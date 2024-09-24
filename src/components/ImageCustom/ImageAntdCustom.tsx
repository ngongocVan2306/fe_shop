"use client";

import { Image } from "antd";
import imageDefault from "../../../public/imageDefault.png";

const ImageAntdCustom = ({
    imageSrc,
    handleError,
    isPreview = false,
    isTarget = false,
    handleClickPreviewImage,
}: {
    imageSrc: string;
    handleError?: () => void;
    isPreview?: boolean;
    isTarget?: boolean;
    handleClickPreviewImage?: () => void;
}) => {
    return (
        <Image
            alt="img"
            onClick={() => {
                if (isPreview && handleClickPreviewImage) {
                    handleClickPreviewImage();
                }
            }}
            className={`object-cover border-[1px] border-solid border-[#ccc] ${
                isPreview
                    ? "w-[100%] h-[50px] rounded-[6px]"
                    : "w-[50px] h-[50px] flex-shrink-0 block rounded-[100%] shadow-sm"
            } ${isTarget ? "hidden" : ""}`}
            src={imageSrc}
            onError={(e) => {
                (e.target as HTMLImageElement).src = imageDefault.src;
                if (handleError) handleError();
            }}
            preview={!isPreview}
        />
    );
};

export default ImageAntdCustom;
