"use client";
import { useEffect } from "react";

const useClickOutSide = (
    divRef: React.RefObject<HTMLDivElement>,
    setTextSearch: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setTextSearch();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [divRef, setTextSearch]);

    return;
};

export default useClickOutSide;
