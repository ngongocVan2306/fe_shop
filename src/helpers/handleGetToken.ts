import { cookies } from "next/headers";

export const handleGetToken = (isRefresh?: boolean) => {
    return {
        withCredentials: true,
        headers: {
            Authorization: cookies().get(
                isRefresh ? "refresh_token" : "access_token"
            )?.value
                ? `Bearer ${
                      cookies().get(
                          isRefresh ? "refresh_token" : "access_token"
                      )?.value
                  }`
                : "",
        },
    };
};
