"use client";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { handleCraeeteCateAction } from "@/action/cateAction";
import Swal from "sweetalert2";
import { mesError, resStatus, toastStatus } from "@/constants";
import { useTranslation } from "react-i18next";

export default function CreateCate() {
    const { t } = useTranslation("cate");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleCreateCate = async () => {
        setIsLoading(true);

        if (!name) {
            setIsLoading(false);
            Swal.fire({
                icon: toastStatus.INFO,
                title: t("errNameEmty"),
            });
            return;
        }

        try {
            const res = await handleCraeeteCateAction(name);
            Swal.fire({
                icon:
                    res.code === resStatus.SUCCESS
                        ? toastStatus.SUCCESS
                        : toastStatus.WARNING,
                title: res.msg,
            });

            if (res.code === resStatus.SUCCESS) {
                setName("");
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
    return (
        <div className="w-full h-full p-[20px]">
            <h4 className="mb-[20px] text-center text-[20px] font-semibold">
                {t("labelCreate")}
            </h4>

            <div className="w-full my-[20px] flex justify-center items-center">
                <label htmlFor="input-name" className="sm:mr-[20px] mr-[5px]">
                    {t("labelInputName")}
                </label>
                <input
                    id="input-name"
                    type="text"
                    className="p-[8px] sm:w-[70%] w-[80%] border-solid border-[1px] border-[#ccc] rounded-[8px] shadow outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="sm:w-[20%] w-[40%] ml-[50%] translate-x-[-50%]">
                {isLoading ? (
                    <Loading />
                ) : (
                    <button
                        className="w-[100%] p-[8px] bg-gradient-to-r from-[#74ebd5] to-[#9face6] rounded-[100px] mt-[20px] text-[#fff] hover:opacity-[0.6]"
                        onClick={() => handleCreateCate()}
                    >
                        {t("labelCreate")}
                    </button>
                )}
            </div>
        </div>
    );
}
