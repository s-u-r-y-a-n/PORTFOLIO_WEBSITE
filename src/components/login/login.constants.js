// Shared constants for the Login feature.

export const API_BASE_URL = "http://localhost:5000";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_FIELD_ERRORS = {
  email: "",
  password: "",
};

export const INITIAL_VALIDATION_STATE = {
  email: false,
  password: false,
};
