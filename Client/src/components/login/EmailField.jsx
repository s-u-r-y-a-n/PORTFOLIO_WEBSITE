import { TextField } from "@mui/material";
import styles from "./login-form.module.scss";

/** Email input — presentational only. */
export function EmailField({ value, onChange, error, helperText, disabled }) {
  return (
    <div className={styles["form-field"]}>
      <TextField
        fullWidth
        id="login-email"
        name="email"
        type="email"
        label="Email"
        placeholder="you@company.com"
        autoComplete="email"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        disabled={disabled}
        className={styles["form-field__input"]}
      />
    </div>
  );
}
