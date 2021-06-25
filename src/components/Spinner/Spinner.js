import styles from "./Spinner.module.css";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

const Loader = ({ isVisible }) => {
  return (
    <span
      className={`${styles["spinner-loader"]} ${
        isVisible ? styles["visible"] : ""
      }`}
    ></span>
  );
};
const Spinner = ({ isVisible }) => {
  return (
    <>
      <Backdrop isVisible={isVisible} />
      {ReactDOM.createPortal(
        <Loader isVisible={isVisible} />,
        document.getElementById("loader")
      )}
    </>
  );
};

export default Spinner;
