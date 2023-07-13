import { Dispatch, SetStateAction } from "react";

export const handleSize34Confirm = (is34: boolean, setIs34: Dispatch<SetStateAction<boolean>>) => {
    setIs34(!is34)
}
export const handleSize36Confirm = (is36: boolean, setIs36: Dispatch<SetStateAction<boolean>>) => {
    setIs36(!is36)
}