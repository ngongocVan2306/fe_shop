export const isEmpty = (data: [] | string | object): boolean => {
    if (Array.isArray(data) || typeof data === "string") {
        return data.length === 0;
    }

    if (typeof data === "object" && data !== null) {
        return Object.keys(data).length === 0;
    }

    return true;
};
