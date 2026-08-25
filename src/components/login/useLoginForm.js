import { useState } from "react";
import {
  INITIAL_FIELD_ERRORS,
  INITIAL_LOGIN_FORM,
  INITIAL_VALIDATION_STATE,
} from "./login.constants";
import {
  sanitizeLoginValue,
  validateLoginCredentials,
} from "./login.validation";
import { loginRequest, persistAuthTokens } from "./auth.api";

/**
 * All Login state + behaviour, extracted from the original component.
 * Behaviour is intentionally identical — only the file layout changed.
 */
export function useLoginForm() {
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState(
    INITIAL_VALIDATION_STATE,
  );
  const [errorMessage, setErrorMessage] = useState(INITIAL_FIELD_ERRORS);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  function handleLoginChange(event) {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeLoginValue(value);

    setLoginForm((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    setValidationError((prev) => ({ ...prev, [name]: false }));
  }

  async function login(event) {
    event.preventDefault();

    const { errors, touched, isValid } = validateLoginCredentials(loginForm);
    setErrorMessage(errors);
    setValidationError(touched);

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const response = await loginRequest(loginForm);
      persistAuthTokens(response.data);
      setLoginForm(INITIAL_LOGIN_FORM);
      //   showToast(
      //     "success",
      //     "Logged In",
      //     response.data.message || "You have been logged in successfully.",
      //   );
      //   navigate("/home");
    } catch (error) {
      console.error(error);
      //   showToast(
      //     "error",
      //     "Login Failed",
      //     error.response?.data?.message ||
      //       "We could not log you in. Please check your details and try again.",
      //   );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    loginForm,
    isSubmitting,
    showPassword,
    validationError,
    errorMessage,
    handleClickShowPassword,
    handleLoginChange,
    login,
  };
}
