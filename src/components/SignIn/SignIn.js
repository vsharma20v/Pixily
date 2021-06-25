import styles from "./SignIn.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthProvider";
import useInput from "../../hooks/useInput";

const emailRegex = new RegExp(
  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
);
const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

const emailValidator = (value) => emailRegex.test(value.trim());
const passwordValidator = (value) => passwordRegex.test(value.trim());

const SignIn = ({
  onHideForm,
  onSignUp,
  showLoaderHandler,
  hideLoaderHandler,
  showAlertHandler,
  isFormVisible,
}) => {
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: emailReset,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(emailValidator);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    reset: passwordReset,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(passwordValidator);

  const togglePasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (!isFormVisible) {
      emailReset();
      passwordReset();
    }
  }, [isFormVisible]);

  const signInFormSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    showLoaderHandler();
    signIn(email, password)
      .then((response) => {
        if (response.user) {
          hideLoaderHandler();
          showAlertHandler("Sign-in successfully");
        }
      })
      .catch((err) => {
        console.error(err);
        hideLoaderHandler();
        showAlertHandler(err.message);
      });
    emailReset();
    passwordReset();
    onHideForm();
  };

  const emailClasses = emailHasError
    ? `${styles["signin-form-input"]} ${styles["invalid"]}`
    : `${styles["signin-form-input"]}`;
  const passwordClasses = passwordHasError
    ? `${styles["signin-form-input"]} ${styles["invalid"]}`
    : `${styles["signin-form-input"]}`;

  return (
    <div className={styles["signin"]}>
      <h2 className={styles["signin-heading"]}>Sign In</h2>
      <form
        onSubmit={signInFormSubmitHandler}
        className={styles["signin-form"]}
      >
        <div className={styles["signin-form-control"]}>
          <input
            required
            placeholder="Email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={email}
            type="email"
            id="email"
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            className={emailClasses}
          />
          <small
            className={
              emailHasError
                ? `${styles["signin-form-error"]} ${styles["visible"]}`
                : `${styles["signin-form-error"]}`
            }
          >
            * Email must be a valid email address.
          </small>
        </div>
        <div className={styles["signin-form-control"]}>
          <div className={styles["signin-form-control-password__container"]}>
            <input
              required
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              title="Password must contain at least eight characters with at least one uppercase letter, one lowercase letter, and one number."
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              className={passwordClasses}
            />
            <button
              onClick={togglePasswordHandler}
              className={styles["signin-form-toggle-password-btn"]}
              type="button"
            >
              {showPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 12C2.73 7.61 7 4.5 12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12ZM20.82 12C19.17 8.63 15.79 6.5 12 6.5C8.21 6.5 4.83 8.63 3.18 12C4.83 15.37 8.21 17.5 12 17.5C15.79 17.5 19.17 15.37 20.82 12ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM7.5 12C7.5 9.52 9.52 7.5 12 7.5C14.48 7.5 16.5 9.52 16.5 12C16.5 14.48 14.48 16.5 12 16.5C9.52 16.5 7.5 14.48 7.5 12Z"
                    fill="#2c2c2c"
                    fillOpacity="1"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.69 6.52499L2.01 3.84499L3.42 2.42499L21.15 20.165L19.74 21.575L16.32 18.155C14.98 18.685 13.52 18.975 12 18.975C7 18.975 2.73 15.865 1 11.475C1.77 9.50499 3.06 7.80499 4.69 6.52499ZM12 5.97499C15.79 5.97499 19.17 8.10499 20.82 11.475C20.23 12.695 19.4 13.745 18.41 14.595L19.82 16.005C21.21 14.775 22.31 13.235 23 11.475C21.27 7.08499 17 3.97499 12 3.97499C10.73 3.97499 9.51 4.17499 8.36 4.54499L10.01 6.19499C10.66 6.06499 11.32 5.97499 12 5.97499ZM10.93 7.11499L13 9.18499C13.57 9.43499 14.03 9.89499 14.28 10.465L16.35 12.535C16.43 12.195 16.49 11.835 16.49 11.465C16.5 8.98499 14.48 6.97499 12 6.97499C11.63 6.97499 11.28 7.02499 10.93 7.11499ZM9.51 11.345L12.12 13.955C12.08 13.965 12.04 13.975 12 13.975C10.62 13.975 9.5 12.855 9.5 11.475C9.5 11.45 9.5025 11.43 9.505 11.41L9.505 11.41L9.505 11.41C9.5075 11.39 9.51 11.37 9.51 11.345ZM7.86 9.69499L6.11 7.94499C4.9 8.86499 3.88 10.045 3.18 11.475C4.83 14.845 8.21 16.975 12 16.975C12.95 16.975 13.87 16.835 14.75 16.595L13.77 15.615C13.23 15.845 12.63 15.975 12 15.975C9.52 15.975 7.5 13.955 7.5 11.475C7.5 10.845 7.63 10.245 7.86 9.69499Z"
                    fill="#2c2c2c"
                    fillOpacity="1"
                  />
                </svg>
              )}
            </button>
          </div>
          <small
            className={
              passwordHasError
                ? `${styles["signin-form-error"]} ${styles["visible"]}`
                : `${styles["signin-form-error"]}`
            }
          >
            * Password must contain at least 8 characters with at least one
            uppercase letter, one lowercase letter, and one number.
          </small>
        </div>
        <button
          className={styles["signin-form-submit-btn"]}
          type="submit"
          disabled={!formIsValid}
        >
          Sign In
        </button>
      </form>
      <div className={styles["signin-footer"]}>
        <p>Need an account?</p>
        <button
          className={styles["signin-footer-signup-link"]}
          onClick={onSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
