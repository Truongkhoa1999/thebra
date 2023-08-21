export const handlePayment = async (
  totalAmountInCents:number,
  orderId:string
) => {
  try {
    const response = await fetch(
      "https://thebrabe.onrender.com/api/v1/stripe/createpaymentlink",
      {
        method: "POST",   
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmountInCents,
          currency: "eur",
          orderId: orderId,
        }),
      }
    );

    if (!response.ok) {
      console.log("Failed to create payment link");
      return;
    }

    const paymentLink = await response.text();
    console.log(paymentLink);

    if (paymentLink) {
      window.open(paymentLink)
    }
  } catch (error) {
    console.error("Error:", error);
  }
};