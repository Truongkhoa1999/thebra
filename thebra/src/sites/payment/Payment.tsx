import AppBar from "../../components/appbar/AppBar"
import { Footer } from "../../components/footer/Footer"
import { PaymentForm } from "../../components/paymentform/PaymentForm"

import './style/payment.scss'
export const Payment = () => {
    return (
        <div className="payment_container">
            <AppBar />
            <PaymentForm  />
            <Footer />
        </div>
    )
}