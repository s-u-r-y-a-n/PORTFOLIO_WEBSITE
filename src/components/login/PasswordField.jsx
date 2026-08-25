import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./login-form.module.scss";

/**
 * Password input with the show/hide adornment.
 * Presentational only — every value and handler is passed in.
 */
export function PasswordField({
  value,
  onChange,
  error,
  helperText,
  showPassword,
  onToggleVisibility,
  disabled,
}) {
  return (
    <div className={styles["form-field"]}>
      <TextField
        fullWidth
        id="login-password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        disabled={disabled}
        className={styles["form-field__input"]}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={onToggleVisibility}
                  edge="end"
                  className={styles["form-field__adornment"]}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}
