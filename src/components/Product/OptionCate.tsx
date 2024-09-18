"use client";

import { defaultPagination } from "@/constants";
import { ICate } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { routes } from "@/utils/menuRouters";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OptionCate({ cates }: { cates: ICate[] }) {
    const [type, setType] = useState<number>(0);

    const router = useRouter();

    return (
        <div className="w-full h-full sm:px-[20px] px-[5px]">
            <div className="w-full">
                <select
                    className="sm:w-[20%] w-[50%] p-[8px] border-solid border-[1px] border-[#ccc] outline-none rounded-[5px] shadow mb-[10px]"
                    value={type}
                    onChange={(e) => {
                        setType(+e.target.value);
                        router.push(
                            `${routes.manageProduct.url}/${e.target.value}${defaultPagination.url}`
                        );
                    }}
                >
                    <option value="0">Tất cả</option>
                    {!isEmpty(cates) &&
                        cates.map((item: ICate) => {
                            return (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                </select>
            </div>
        </div>
    );
}
