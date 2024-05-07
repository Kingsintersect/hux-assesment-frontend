export const getToken = (): string | null => {
    return localStorage.getItem("accessToken");
}

export const deleteToken = (): void => {
    localStorage.removeItem("accessToken");
}