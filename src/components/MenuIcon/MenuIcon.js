import styles from "./MenuIcon.module.css";

const MenuIcon = ({ onShowMenu }) => {
  return (
    <button className={styles["menuicon"]} onClick={onShowMenu}>
      <svg
        width="35"
        height="15"
        viewBox="0 0 35 17"
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
      >
        <path
          d="M34.278 0H0.722C0.32325 0 0 0.32325 0 0.722C0 1.12075 0.32325 1.444 0.722 1.444H34.278C34.6768 1.444 35 1.12075 35 0.722C35 0.32325 34.6768 0 34.278 0Z"
          fill="#2C2C2C"
        />
        <path
          d="M34.278 7.77802H0.722C0.32325 7.77802 0 8.10127 0 8.50002C0 8.89876 0.32325 9.22202 0.722 9.22202H34.278C34.6768 9.22202 35 8.89876 35 8.50002C35 8.10127 34.6768 7.77802 34.278 7.77802Z"
          fill="#2C2C2C"
        />
        <path
          d="M34.278 15.556H0.722C0.32325 15.556 0 15.8793 0 16.278C0 16.6768 0.32325 17 0.722 17H34.278C34.6768 17 35 16.6768 35 16.278C35 15.8793 34.6768 15.556 34.278 15.556Z"
          fill="#2C2C2C"
        />
      </svg>
    </button>
  );
};

export default MenuIcon;
