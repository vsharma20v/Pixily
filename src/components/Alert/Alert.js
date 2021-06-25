import styles from "./Alert.module.css";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

const AlertBox = ({ children, isVisible, onHide }) => {
  const classes = `${styles["alert-box"]} ${
    isVisible ? styles["visible"] : ""
  }`;
  return (
    <div className={classes}>
      <button className={styles["alert-box__close-btn"]} onClick={onHide}>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 17L17 1M17 17L1 1"
            stroke="#2c2c2c"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
      <p>{children}</p>
    </div>
  );
};

const Alert = ({ isVisible, onHide, children }) => {
  return (
    <>
      <Backdrop isVisible={isVisible} onHide={onHide} />
      {ReactDOM.createPortal(
        <AlertBox isVisible={isVisible} onHide={onHide}>
          {children}
        </AlertBox>,
        document.getElementById("alert-box")
      )}
    </>
  );
};

export default Alert;
