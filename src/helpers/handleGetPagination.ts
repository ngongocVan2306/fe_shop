import { defaultPagination } from "@/constants";
import { ISearchParams } from "@/utils/interface";

export const handleGetPagination = (searchParams: ISearchParams) => {
    return {
        page: +(searchParams?.page ?? defaultPagination.page),
        pageSize: +(searchParams?.pageSize ?? defaultPagination.pageSize),
    };
};
