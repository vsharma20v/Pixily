import styles from "./MenuSideDrawer.module.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";
import { useContext } from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

const capitalizeName = (value) => {
  return [value.split("")[0].toUpperCase(), ...value.slice(1).split("")].join(
    ""
  );
};

const SideDrawer = ({
  isMenuVisible,
  onSignIn,
  onSignUp,
  onHideMenu,
  showLoaderHandler,
  hideLoaderHandler,
  showAlertHandler,
}) => {
  const { currentUser, signOut } = useContext(AuthContext);
  const history = useHistory();
  const isFavouritesPage = history.location.pathname === "/favourites";
  const signOutHandler = () => {
    showLoaderHandler();
    signOut()
      .then(() => {
        hideLoaderHandler();
        showAlertHandler("Sign-out Successfully");
      })
      .catch((error) => {
        console.error(error);
        hideLoaderHandler();
        showAlertHandler(error.message);
      });
    onHideMenu();
  };

  const yourFavouritesHandler = () => {
    if (isFavouritesPage) {
      history.push("/");
    } else {
      history.push("/favourites");
    }
    onHideMenu();
  };

  let menuListItem = null;
  if (currentUser) {
    menuListItem = (
      <>
        <li className={styles["menu-list-item"]}>
          Hi {capitalizeName(currentUser.firstName)}
        </li>
        <li className={styles["menu-list-item"]}>
          {isFavouritesPage && (
            <button onClick={yourFavouritesHandler}>Search Pixily</button>
          )}
          {!isFavouritesPage && (
            <button onClick={yourFavouritesHandler}>Your Favourites</button>
          )}
        </li>
        <li className={styles["menu-list-item"]}>
          <button onClick={signOutHandler}>Sign Out</button>
        </li>
      </>
    );
  } else {
    menuListItem = (
      <>
        <li className={styles["menu-list-item"]}>
          <button onClick={onSignIn}>Sign In</button>
        </li>
        <li className={styles["menu-list-item"]}>
          <button onClick={onSignUp}>Sign Up</button>
        </li>
      </>
    ); 
  }

  return (
    <div
      className={`${styles["menusidedrawer"]} ${
        isMenuVisible ? styles.open : ""
      }`}
    >
      <button className={styles["menu-close-btn"]} onClick={onHideMenu}>
        <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 17L17 1M17 17L1 1"
            stroke="#2c2c2c"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <ul className={styles["menu-list"]}>{menuListItem}</ul>
    </div>
  );
};

const MenuSideDrawer = ({
  onHideMenu,
  isMenuVisible,
  onSignIn,
  onSignUp,
  showLoaderHandler,
  hideLoaderHandler,
  showAlertHandler,
}) => {
  return (
    <>
      <Backdrop onHide={onHideMenu} isVisible={isMenuVisible} />
      {ReactDOM.createPortal(
        <SideDrawer
          onHideMenu={onHideMenu}
          isMenuVisible={isMenuVisible}
          onSignIn={onSignIn}
          onSignUp={onSignUp}
          showLoaderHandler={showLoaderHandler}
          hideLoaderHandler={hideLoaderHandler}
          showAlertHandler={showAlertHandler}
        />,
        document.getElementById("side-drawer")
      )}
    </>
  );
};

export default MenuSideDrawer;
