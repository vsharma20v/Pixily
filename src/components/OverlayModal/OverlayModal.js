import styles from "./OverlayModal.module.css";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ onHide, isVisible, children }) => {
  const classes = `${styles["overlay-modal"]} ${
    isVisible ? styles["visible"] : ""
  }`;
  return (
    <div className={classes}>
      <button className={styles["overlay-modal__close-btn"]} onClick={onHide}>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 17L17 1M17 17L1 1"
            stroke="#2c2c2c"
            strokeLinecap="round"
          ></path> 
        </svg>
      </button>
      {children}
    </div>
  );
};

const OverlayModal = ({ children, onHide, isVisible }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHide={onHide} isVisible={isVisible} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <Modal onHide={onHide} isVisible={isVisible}>
          {children}
        </Modal>,
        document.getElementById("overlay-modal")
      )}
    </>
  );
};

export default OverlayModal;
