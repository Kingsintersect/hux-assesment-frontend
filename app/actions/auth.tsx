export const getToken = (): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem("accessToken");
}

export const deleteToken = (): void => {
    localStorage.removeItem("accessToken");
}