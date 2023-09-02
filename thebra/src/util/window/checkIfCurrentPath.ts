import { useLocation } from "react-router-dom"

export const checkIfCurrentPath = (inputURL: string):boolean => {
    const location = useLocation()
    return location.pathname === inputURL
}