import { Button } from "@mui/material";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import styles from "./login-form.module.scss";

/**
 * The form markup only. All state lives in the Login container,
 * so this component stays easy to reuse and test.
 */
export function LoginForm({
  loginForm,
  errorMessage,
  validationError,
  isSubmitting,
  showPassword,
  onChange,
  onToggleVisibility,
  onSubmit,
}) {
  return (
    <form className={styles["login-form"]} onSubmit={onSubmit} noValidate>
      <EmailField
        value={loginForm.email}
        onChange={onChange}
        error={validationError.email}
        helperText={errorMessage.email}
        disabled={isSubmitting}
      />

      <PasswordField
        value={loginForm.password}
        onChange={onChange}
        error={validationError.password}
        helperText={errorMessage.password}
        showPassword={showPassword}
        onToggleVisibility={onToggleVisibility}
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        variant="contained"
        disableElevation
        disabled={isSubmitting}
        className={styles["login-button"]}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
