"use client";

import { isEmpty } from "@/utils/isEmpty";
import { Image } from "antd";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import imageDefault from "../../../public/imageDefault.png";
import ImageAntdCustom from "../ImageCustom/ImageAntdCustom";

export default function PreviewImage({
    data,
    isFile,
}: {
    data: File[] | string[];
    isFile: boolean;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [linkPreview, setLinkPreview] = useState<string>("");
    const [dataListImages, setDataListImages] = useState<string[]>([]);

    useEffect(() => {
        if (!isEmpty(data)) {
            const arrLinkImage = data.map((item: File | string) => {
                if (isFile && item instanceof File) {
                    return URL.createObjectURL(item);
                }
                if (typeof item === "string") {
                    return process.env.NEXT_PUBLIC_BASE_IMAGE + item;
                }
                return "";
            });

            setDataListImages(arrLinkImage);
            return;
        }

        setDataListImages([]);
        setLinkPreview("");
    }, [data, isFile]);

    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <ImageAntdCustom
                        imageSrc={dataListImages[i]}
                        handleError={() => {
                            dataListImages[i] = imageDefault.src;
                        }}
                    />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handleClickPreviewImage = (link: string) => {
        setIsOpen(true);
        setLinkPreview(link);
    };

    return (
        <div className="slider-preview-image w-[100%] h-[100%]">
            <div className="preview-image-custom-slider">
                {isOpen && (
                    <Image.PreviewGroup
                        preview={{
                            visible: isOpen,
                            onVisibleChange: (visible) => {
                                setIsOpen(visible);
                            },
                        }}
                    >
                        <ImageAntdCustom
                            imageSrc={linkPreview}
                            isTarget={true}
                            handleError={() => {
                                setLinkPreview(imageDefault.src);
                            }}
                        />
                    </Image.PreviewGroup>
                )}
            </div>
            <Slider {...settings}>
                {!isEmpty(dataListImages) &&
                    dataListImages.map((item, index) => (
                        <div key={index} className="w-[100px] h-[100px]">
                            <ImageAntdCustom
                                imageSrc={item}
                                isPreview={true}
                                handleClickPreviewImage={() =>
                                    handleClickPreviewImage(item)
                                }
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
}
