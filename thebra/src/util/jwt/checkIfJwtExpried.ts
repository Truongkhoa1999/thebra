import jwtDecode from "jwt-decode";

export const isTokenExpired = (): boolean => {
    const token = localStorage.getItem("jwt")
    if (token) {
        const decodedToken: any = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decodedToken.exp && decodedToken.exp > currentTime) {
            return false;
        }
    }
    return true;
}
export const isNonUser = () => {
    const isNonUserValue = localStorage.getItem('isNonUser');
    return isNonUserValue === 'true';
}