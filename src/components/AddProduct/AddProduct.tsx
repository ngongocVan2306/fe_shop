"use client";

import handleValidateImage from "@/helpers/handleValidateImage";
import { useCallback, useRef, useState } from "react";
import PreviewImage from "../PreviewImage/PreviewImage";
import Swal from "sweetalert2";
import { handleAddProductService } from "@/action/productAction";
import { ICate } from "@/utils/interface";
import { FieldValues, useForm } from "react-hook-form";
import FormGroup from "../FormGroup/FormGroup";
import Loading from "../Loading/Loading";
import LabelComponent from "../LabelComponent/LabelComponent";
import { mesError, resStatus, toastStatus } from "@/constants";
import iconAdd from "../../../assets/icons/iconAdd.svg";
import Image from "next/image";
import { isEmpty } from "@/utils/isEmpty";

export default function AddProduct({ cates }: { cates: ICate[] }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);

    const refInput = useRef<HTMLInputElement | null>(null);

    const handleClickChooseFile = useCallback(() => {
        refInput.current?.click();
    }, []);

    const handleChooseFiles = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files || !files.length) return;

            const imageFiles: File[] = [];
            Array.from(files).forEach((file) => {
                if (handleValidateImage(file)) {
                    imageFiles.push(file);
                }
            });

            setFiles(imageFiles);
        },
        []
    );

    const handleClear = () => {
        setFiles([]);
        reset();
    };

    const handleValidate = (): boolean => {
        if (!files || files.length <= 0) {
            Swal.fire({
                icon: toastStatus.WARNING,
                title: "Bạn vui lòng nhập đủ thông tin!",
            });
            return false;
        }
        return true;
    };

    const handleAddProduct = async (data: FieldValues) => {
        setIsLoading(true);
        const isValid = handleValidate();

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("total", data.total);
            formData.append("type", data.type);
            formData.append("price", data.price);
            files.forEach((file) => formData.append("files", file));

            const res = await handleAddProductService(formData);

            Swal.fire({
                icon:
                    res.code === resStatus.SUCCESS
                        ? toastStatus.SUCCESS
                        : toastStatus.WARNING,
                title: res.msg,
            });

            if (res.code === resStatus.SUCCESS) {
                handleClear();
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: toastStatus.ERROR,
                title: mesError,
            });
        }

        setIsLoading(false);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    return (
        <div className="w-[100%] h-[100%] py-[20px] font-semibold text-[25px]">
            <h4 className="text-center">Thêm Sản Phẩm</h4>

            <div className="flex sm:flex-row flex-col justify-center sm:px-[50px] mt-[40px]">
                <div className="sm:w-[50%] w-full flex flex-col items-center sm:order-1 order-2">
                    <form
                        onSubmit={handleSubmit(handleAddProduct)}
                        className="w-[80%]"
                    >
                        <FormGroup
                            label=" Tên sản phẩm"
                            name="name"
                            type="text"
                            errors={errors}
                            register={register}
                            isRequired={true}
                        />

                        <FormGroup
                            label=" Số lượng sản phẩm"
                            name="total"
                            type="number"
                            errors={errors}
                            register={register}
                            isRequired={true}
                        />

                        <FormGroup
                            label="Giá sản phẩm"
                            name="price"
                            type="number"
                            errors={errors}
                            register={register}
                            isRequired={true}
                        />

                        <FormGroup
                            label="Danh mục"
                            name="type"
                            type=""
                            register={register}
                            errors={errors}
                            isRequired={false}
                            isSelect={true}
                            dataSelect={cates}
                        />

                        {isLoading ? (
                            <div className="mt-[40px] w-[40%] ml-[50%] translate-x-[-50%]">
                                <Loading />
                            </div>
                        ) : (
                            <input
                                className="mt-[40px] w-[40%] py-[8px]  bg-[#ccc] rounded-full cursor-pointer bg-gradient-to-r from-[#74ebd5] to-[#9face6] border-none text-[#fff] flex justify-center ml-[50%] translate-x-[-50%] hover:opacity-[0.6]"
                                type="submit"
                            />
                        )}
                    </form>
                </div>

                <div className="sm:w-[50%] w-full order-1 sm:order-2">
                    <LabelComponent value="Chọn ảnh" />

                    <button
                        className="w-[150px] rounded-[10px] p-[8px] shadow text-[16px] font-normal bg-[orange] text-[#fff] hover:cursor-pointer hover:opacity-[0.6] ml-[10px] mb-[10px]"
                        onClick={() => setFiles([])}
                    >
                        Chọn lại ảnh
                    </button>
                    <input
                        ref={refInput}
                        type="file"
                        multiple
                        onChange={handleChooseFiles}
                        className="font-thin"
                        hidden
                        accept="image/png, image/gif, image/jpeg"
                    />

                    {isEmpty(files) && (
                        <div
                            className="sm:w-[80%] w-full h-[200px] relative border-solid border-[1px] border-[#ccc] rounded-[10px] flex justify-center items-center"
                            onClick={() => handleClickChooseFile()}
                        >
                            <div className="absolute hover:cursor-pointer hover:opacity-[0.5]">
                                <Image
                                    width={50}
                                    height={50}
                                    src={iconAdd}
                                    alt="add"
                                />
                            </div>
                        </div>
                    )}

                    <div className="w-[100%] min-h-[100px] mb-[20px]">
                        <PreviewImage data={files} isFile={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
