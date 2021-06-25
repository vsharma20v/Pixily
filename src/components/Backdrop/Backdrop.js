import styles from "./Backdrop.module.css";

const Backdrop = ({ isVisible, onHide }) => {
  const classes = `${styles["backdrop"]} ${isVisible ? styles["visible"] : ""}`;
  return <div className={classes} onClick={onHide}></div>;
};

export default Backdrop;
