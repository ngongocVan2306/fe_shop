"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value: string, time: number) => {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const id = setTimeout(() => {
            setText(value);
        }, time);
        return () => clearTimeout(id);
    }, [value, time]);
    return text.trim();
};
