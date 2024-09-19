const handleParams = ({
    page,
    pageSize,
    textSearch,
    type,
}: {
    page?: number;
    pageSize?: number;
    textSearch?: string;
    type?: number;
}): string => {
    return `?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}&type=${type}`;
};

export default handleParams;
