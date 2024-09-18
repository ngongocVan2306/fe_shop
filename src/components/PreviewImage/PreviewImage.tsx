"use client";

import { isEmpty } from "@/utils/isEmpty";
import { Image } from "antd";

import { useEffect, useState } from "react";
import Slider from "react-slick";

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const arrLinkImage = data.map((item: any) => {
                if (isFile) return URL.createObjectURL(item);

                return process.env.NEXT_PUBLIC_BASE_IMAGE + item;
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
                    <Image
                        alt="img"
                        className="w-[50px] h-[50px] object-cover flex-shrink-0 block rounded-[50%] shadow-sm border-[1px] border-solid border-[#ccc]"
                        src={dataListImages[i]}
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
                        <Image src={linkPreview} alt="img" className="hidden" />
                    </Image.PreviewGroup>
                )}
            </div>
            <Slider
                {...settings}
                // defaultChecked={1}
            >
                {!isEmpty(dataListImages) &&
                    dataListImages.map((item, index) => (
                        <div key={index} className="w-[100px] h-[100px]">
                            <Image
                                onClick={() => {
                                    handleClickPreviewImage(item);
                                }}
                                sizes="1"
                                alt="image"
                                preview={false}
                                key={index}
                                className="w-[100%] object-cover h-[50px] rounded-[6px] border-[1px] border-solid border-[#ccc]"
                                src={item}
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
}
