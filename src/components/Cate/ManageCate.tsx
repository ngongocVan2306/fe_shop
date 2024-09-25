"use client";

import {
    handleDeleteCateAction,
    handleGetCateAction,
} from "@/action/cateAction";
import { mesError, resStatus, toastStatus } from "@/constants";
import { ICate } from "@/utils/interface";
import Swal from "sweetalert2";
import { isEmpty } from "@/utils/isEmpty";
import Image from "next/image";
import iconTrash from "../../../assets/icons/iconTrash.svg";
import useGetAllData from "@/hook/useGetAllData";
import { DivFlex, DivGrid, DivStyled } from "@/styledComponent/Div";
import { TextStyled } from "@/styledComponent/TextStyled";
import { ButtonStyled } from "@/styledComponent/ButtonStyled";

export default function ManageCate() {
    const { data, handleReload } = useGetAllData({ api: handleGetCateAction });

    const handleDeleteCate = (data: ICate) => {
        Swal.fire({
            icon: toastStatus.QUESTION,
            title: `Bạn có chắc muốn xóa danh mục ${data.name} ?`,
            showDenyButton: true,
            confirmButtonText: "OK",
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await handleDeleteCateAction(data.id);
                    Swal.fire({
                        icon:
                            res.code === resStatus.SUCCESS
                                ? toastStatus.SUCCESS
                                : toastStatus.WARNING,
                        title: res.msg,
                    });

                    if (res.code === resStatus.SUCCESS) {
                        handleReload();
                    }
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
        <DivStyled padding="20px">
            <TextStyled size="20px" weight={500}>
                {" "}
                Quản lí danh mục
            </TextStyled>

            <DivGrid columns={4} marginTop="20px">
                {!isEmpty(data) &&
                    data.map((item: ICate) => {
                        return (
                            <DivFlex
                                colorBorder="#ccc"
                                padding="20px"
                                justyfy="space-between"
                                key={item.id}
                                rounded="10px"
                                isShadow
                            >
                                <TextStyled>{item.name}</TextStyled>
                                <ButtonStyled
                                    background="red"
                                    padding="8px"
                                    color="#fff"
                                    onClick={() => handleDeleteCate(item)}
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={iconTrash}
                                        alt="trash"
                                    />
                                </ButtonStyled>
                            </DivFlex>
                        );
                    })}
            </DivGrid>
        </DivStyled>
    );
}
