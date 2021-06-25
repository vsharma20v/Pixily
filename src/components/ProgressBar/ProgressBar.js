import styles from "./ProgressBar.module.css";
const ProgressBar = ({ loaded, total }) => {
  const percentage = total === 0 ? 0 : (loaded / total) * 100;

  return (
    <div
      className={`${styles["progressbar"]} ${
        loaded < total ? styles["visible"] : ""
      }`}
    >
      {percentage.toFixed(0) + "%"}
    </div>
  );
};

export default ProgressBar;
