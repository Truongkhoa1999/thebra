
// components
import AppBar from "../../components/appbar/AppBar"
import { Footer } from "../../components/footer/Footer"
import { SigninForm } from "../../components/signinform/SigninForm"

// material 
import './style/SignIn.scss'


export const SignIn = () => {
    return (
        <div className="signin_container">
            <AppBar />
            <SigninForm />
            <Footer />
        </div>
    )
}