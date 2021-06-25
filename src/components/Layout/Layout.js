import MenuSideDrawer from "../MenuSideDrawer/MenuSideDrawer";
import OverlayModal from "../OverlayModal/OverlayModal";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const Layout = ({
  children,
  isMenuVisible,
  onHideMenu,
  signUpHandler,
  signInHandler,
  hideFormHandler,
  isFormVisible,
  isSignUpVisible,
  isSignInVisible,
  showLoaderHandler,
  hideLoaderHandler,
  showAlertHandler,
}) => {
  return (
    <>
      {children}
      <MenuSideDrawer
        isMenuVisible={isMenuVisible}
        onHideMenu={onHideMenu}
        onSignIn={signInHandler}
        onSignUp={signUpHandler}
        showLoaderHandler={showLoaderHandler}
        hideLoaderHandler={hideLoaderHandler}
        showAlertHandler={showAlertHandler}
      />
      <OverlayModal isVisible={isFormVisible} onHide={hideFormHandler}>
        {isSignInVisible && (
          <SignIn
            isFormVisible={isFormVisible}
            onHideForm={hideFormHandler}
            onSignUp={signUpHandler}
            showLoaderHandler={showLoaderHandler}
            hideLoaderHandler={hideLoaderHandler}
            showAlertHandler={showAlertHandler}
          />
        )}
        {isSignUpVisible && (
          <SignUp
            isFormVisible={isFormVisible}
            onHideForm={hideFormHandler}
            onSignIn={signInHandler}
            showLoaderHandler={showLoaderHandler}
            hideLoaderHandler={hideLoaderHandler}
            showAlertHandler={showAlertHandler}
          />
        )}
      </OverlayModal>
    </>
  );
};

export default Layout;
