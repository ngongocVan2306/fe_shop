"use client";

import { resStatus } from "@/constants";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGetAllData = ({ api }: { api: any }) => {
    const [isReload, setIsReload] = useState<boolean>(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await api();

            if (res.code === resStatus.SUCCESS) {
                setData(res.data);
            }
        };

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReload]);

    const handleReload = () => {
        setIsReload(!isReload);
    };

    return { data, handleReload };
};

export default useGetAllData;
