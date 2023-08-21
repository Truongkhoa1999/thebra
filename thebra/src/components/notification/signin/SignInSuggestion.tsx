import { useNavigate } from "react-router-dom";

const SignInSuggestion = ({  setIsNotificationVisible }: { className: string, setIsNotificationVisible: (value: boolean) => void }) => {
    const navigate = useNavigate()

    const handleCloseClick = () => {
        setIsNotificationVisible(false);
    };
    const handleGuestClick = () => {
        localStorage.setItem('isNonUser', 'true'); 
        setIsNotificationVisible(false);
        handleCloseClick()
    };
    return (
        <div className="signin-notification">
            <div className="headingNotification">
                <button onClick={handleCloseClick}>X</button>
            </div>
            <h1>Login Required</h1>
            <div className="buttons">
                <button onClick={() => navigate('/signin')}>Sign-in</button>
                <button>Sign-up</button>
                <button onClick={handleGuestClick}>Continue as a guest</button>
            </div>

        </div>
    )
}
export default SignInSuggestion
