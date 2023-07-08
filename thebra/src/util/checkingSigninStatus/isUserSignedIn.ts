export const isUserSignedIn = ():boolean => {
    const jwtToken = localStorage.getItem('jwt')
    return !!jwtToken
}