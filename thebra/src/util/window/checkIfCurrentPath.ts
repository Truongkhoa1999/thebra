import { useLocation } from "react-router-dom";

export const checkIfCurrentPath = (inputURL: string): boolean => {
  const location = useLocation();
  return location.pathname.includes(inputURL);
};
export const checkIfOrderIdNull = () => {
  const orderId = localStorage.getItem("orderId");
  if (orderId) {
    return false;
  }
  return true;
};
