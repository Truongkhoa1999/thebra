import { createContext, useContext } from "react";

export const TotalPriceContext = createContext(null)
export const useTotalPrice = () => {
    return useContext(TotalPriceContext)
}