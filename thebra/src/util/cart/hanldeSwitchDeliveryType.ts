import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleSwitchDeliveryType = (e: ChangeEvent<HTMLInputElement>, setSelectedDeliveryType: Dispatch<SetStateAction<number>>) => {
    setSelectedDeliveryType(parseInt(e.target.value, 10));
}