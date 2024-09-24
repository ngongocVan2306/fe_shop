"use client";

import Image from "next/image";
import imageDefault from "../../../public/imageDefault.png";
import { Dispatch, SetStateAction } from "react";

const ImageCustom = ({
    setImageSrc,
    image,
}: {
    setImageSrc: Dispatch<SetStateAction<string>>;
    image: string;
}) => {
    return (
        <Image
            width={100}
            height={100}
            src={image}
            alt="Image"
            className="w-full object-contain rounded-[10px]"
            onError={() => setImageSrc(imageDefault.src)}
        />
    );
};

export default ImageCustom;
