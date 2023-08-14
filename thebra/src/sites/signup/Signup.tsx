
// components
import AppBar from "../../components/appbar/AppBar"
import { Footer } from "../../components/footer/Footer"
import { SignupForm } from "../../components/signupform/SignupForm"

// material 
import './style/Signup.scss'


export const Signup = () => {
    return (
        <div className="signup_container">
            <AppBar />
            <SignupForm />
            <Footer />
        </div>
    )
}