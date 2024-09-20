const handleParams = (params: {
    page?: number;
    pageSize?: number;
    textSearch?: string;
    type?: number;
    userId?: number;
}): string => {
    let result = "?";
    for (const [key, value] of Object.entries(params)) {
        result = result + `${key}=${value}&`;
    }

    return result;
};

export default handleParams;
