export const formatOrderId = (orderId: string) => {
  return orderId.replace(/-(.*?)-/g, "-XXXX-");
};

export const formatNumberWithTwoDecimalPlaces = (price:number) => {
  const formattedNumber = price.toFixed(2);
  return formattedNumber;
}

