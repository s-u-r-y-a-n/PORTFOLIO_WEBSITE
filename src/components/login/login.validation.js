import { EMAIL_PATTERN, INITIAL_FIELD_ERRORS } from "./login.constants";

/**
 * Pure validation for the login form.
 * Returns the same error shape the component renders, plus an `isValid` flag.
 * Logic is unchanged from the original implementation.
 */
export function validateLoginCredentials(form) {
  const errors = { ...INITIAL_FIELD_ERRORS };

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required";
  }

  return {
    errors,
    touched: {
      email: !!errors.email,
      password: !!errors.password,
    },
    isValid: !Object.values(errors).some(Boolean),
  };
}

/** Login inputs must never contain whitespace. */
export function sanitizeLoginValue(value) {
  return value.replace(/\s/g, "");
}
