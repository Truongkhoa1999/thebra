export const isUserSignedIn = ():boolean => {
    const jwtToken = localStorage.getItem('jwt')
    const isNonUser = localStorage.getItem('isNonUser')
    if (jwtToken && !isNonUser){
        return true
    } else{
        return false
    }
}
