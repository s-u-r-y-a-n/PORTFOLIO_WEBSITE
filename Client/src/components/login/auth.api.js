import axios from "axios";
import { API_BASE_URL } from "./login.constants";

/** POST /admin/login — unchanged request contract. */
export function loginRequest(credentials) {
  return axios.post(`${API_BASE_URL}/admin/login`, credentials);
}

/** Persists the tokens returned by the login endpoint. */
export function persistAuthTokens({ accessToken, refreshToken }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
