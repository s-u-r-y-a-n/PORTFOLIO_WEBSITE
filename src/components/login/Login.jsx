// import { Link } from "react-router-dom";
import { useLoginForm } from "./useLoginForm";
import { LoginForm } from "./LoginForm";
import styles from "./login-form.module.scss";

/**
 * Login page container: page shell + card layout.
 * Functionality is unchanged — it now lives in useLoginForm().
 */
export const Login = () => {
  const {
    loginForm,
    isSubmitting,
    showPassword,
    validationError,
    errorMessage,
    handleClickShowPassword,
    handleLoginChange,
    login,
  } = useLoginForm();

  return (
    <main className={styles["login-page"]}>
      <section className={styles["login-card"]}>
        <header className={styles["login-card__header"]}>
          <h1 className={styles["login-card__title"]}>Welcome back</h1>
          <p className={styles["login-card__description"]}>
            Sign in to your Lead Management account
          </p>
        </header>

        <div className={styles["login-card__body"]}>
          <LoginForm
            loginForm={loginForm}
            errorMessage={errorMessage}
            validationError={validationError}
            isSubmitting={isSubmitting}
            showPassword={showPassword}
            onChange={handleLoginChange}
            onToggleVisibility={handleClickShowPassword}
            onSubmit={login}
          />
        </div>

        <footer className={styles["login-card__footer"]}>
          <div className={styles["login-links"]}>
            {/* <Link className={styles["login-links__link"]} to="/register">
              Don&apos;t have an account ?
            </Link>
            <Link className={styles["login-links__link"]} to="/forgot-password">
              Forgot Password ?
            </Link> */}
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Login;
