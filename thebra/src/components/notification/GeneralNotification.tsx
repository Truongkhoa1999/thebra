const GeneralNotification = ({
  notification,
  setIsNotificationVisible,
}: {
  notification: string;
  setIsNotificationVisible: (value: boolean) => void;
  className: string;
}) => {
  const handleCloseClick = () => {
    setIsNotificationVisible(false);
    window.location.reload()
  };
  return (
    <div className="signin-notification">
      <div className="headingNotification">
        <button onClick={handleCloseClick}>X</button>
      </div>
      <p className="title">{notification}</p>
      <div className="buttons">
        <button onClick={handleCloseClick}>Ok</button>
      </div>
    </div>
  );
};
export default GeneralNotification;
