"use client";

import { handleSearchProduct } from "@/action/productAction";
import { useDebounce } from "@/hook/useDebound";
import { IProduct } from "@/utils/interface";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import iconSearch from "../../../assets/icons/iconSearch.svg";
import { isEmpty } from "@/utils/isEmpty";
import { useResize } from "@/hook/useResize";
import useClickOutSide from "@/hook/useClickOutSide";
import Link from "next/link";
import { routes } from "@/utils/menuRouters";
import LinkComponent from "../LinkComponent/LinkComponent";
import ItemSearch from "./ItemSearch";

export default function FormSearch() {
    const [textSearch, setTextSearch] = useState<string>("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isView, setIsView] = useState<boolean>(false);

    const width = useResize();

    const divRef = useRef<HTMLDivElement>(null);

    const debounce = useDebounce(textSearch, 700);
    useClickOutSide(divRef, () => setProducts([]));

    useEffect(() => {
        if (debounce) {
            const fetch = async () => {
                const res = await handleSearchProduct(debounce);
                if (res.code === 200) {
                    setProducts(res.data.items);
                }
            };
            fetch();
            return;
        }

        setProducts([]);
    }, [debounce]);

    return (
        <div className="w-full h-[50px] relative">
            <div className="w-full h-full flex justify-end items-center">
                <input
                    type="text"
                    className={`sm:w-[80%] w-[90vw] h-[80%] p-[8px] border-solid border-[#ccc] border-[1px] shadow outline-none rounded-l-[10px] sm:rounded-r-[0px] rounded-r-[10px] sm:mt-[0px] mt-[100px] sm:sticky absolute sm:ml-[0px] ml-[100px] ${
                        isView ? "hidden" : ""
                    }`}
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                />

                <Link
                    href={routes.search.url + `?textSearch=${debounce}`}
                    className="w-[50%] h-[100%] mt-[10px]"
                >
                    <button
                        className="sm:w-[20%] w-[100%] h-[80%] mr-[20px] p-[8px] flex justify-center rounded-r-[10px] sm:rounded-l-[0px] rounded-l-[10px] text-[#fff] bg-[var(--color-price)]"
                        onClick={() =>
                            width <= 650 ? setIsView(!isView) : null
                        }
                    >
                        <Image
                            width={30}
                            height={30}
                            src={iconSearch}
                            alt="search"
                            className="h-[100%] object-cover"
                        />
                    </button>
                </Link>
            </div>

            {!isEmpty(products) && (
                <div
                    className="none-scroll-bar sm:w-full w-[90vw] overflow-auto max-h-[60vh] bg-[#fff] rounded-[10px] shadow p-[5px]"
                    ref={divRef}
                >
                    {products.map((item: IProduct) => {
                        return (
                            <LinkComponent
                                href={routes.detail.url + item.id}
                                key={item.id}
                            >
                                <ItemSearch
                                    product={item}
                                    handleChooseItem={() => setProducts([])}
                                />
                            </LinkComponent>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
