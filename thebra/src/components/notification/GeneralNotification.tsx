

const GeneralNotification = ({ notification ,setIsNotificationVisible }: { notification:string, setIsNotificationVisible: (value: boolean) => void,className: string }) => {

    const handleCloseClick = () => {
        setIsNotificationVisible(false);
    };
    return (
        <div className="signin-notification">
            <div className="headingNotification">
                <button onClick={handleCloseClick}>X</button>
            </div>
            <h1>{notification}</h1>
            <div className="buttons">
                <button onClick={handleCloseClick}>Ok</button>
            </div>
        </div>
    )
}
export default GeneralNotification
