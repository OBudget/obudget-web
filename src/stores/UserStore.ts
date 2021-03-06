import axios from "axios";
import crypto from "crypto-js";
import { makeAutoObservable } from "mobx";

import { FetchStatus } from "src/types";
import { BudgetStore } from "src/stores";

const DEFAULT_PASSWORD_SALT = "Q6?Lv.4S7e$Hh&";

interface LoginFormProps {
  email: string;
  password: string;
}

interface RegistrationFormProps {
  name?: string;
  email: string;
  password: string;
}

export const hashPassword = (password: string, salt: string): string => {
  // Generate a 512 bit key with 100001 iterations
  return crypto
    .PBKDF2(password, salt, { iterations: 50001, keySize: 512 / 32 })
    .toString(crypto.enc.Hex);
};

export default class UserStore {
  state = FetchStatus.Done;

  authenticated = false;

  accessToken: string | null = null;

  refreshToken: string | null = null;

  tokenExpiresIn: string | null = null;

  budget = new BudgetStore(this);

  constructor() {
    this.restoreSessionFromLocalStorage();
    makeAutoObservable(this);
  }

  restoreSessionFromLocalStorage() {
    if (localStorage.getItem("accessToken")) {
      this.accessToken = localStorage.getItem("accessToken");
    }

    if (localStorage.getItem("refreshToken")) {
      this.refreshToken = localStorage.getItem("refreshToken");
    }

    if (localStorage.getItem("tokenExpiresIn")) {
      this.tokenExpiresIn = localStorage.getItem("tokenExpiresIn");
    }

    this.authenticated = Boolean(
      this.accessToken && this.refreshToken && this.tokenExpiresIn
    );
  }

  logout() {
    localStorage.clear();
    this.restoreSessionFromLocalStorage();
  }

  async login(values: LoginFormProps): Promise<any> {
    this.state = FetchStatus.Pending;

    try {
      let salt = process.env.REACT_APP_PASSWORD_SALT;
      if (!salt) {
        salt = DEFAULT_PASSWORD_SALT;
      }
      const saltedPass = hashPassword(values.password, salt);

      const authData = new URLSearchParams();
      authData.append("grant_type", "password");
      authData.append("username", values.email);
      authData.append("password", saltedPass);
      authData.append("client_id", process.env.REACT_APP_CLIENT_ID || "");

      const token = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/token/`,
        authData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      localStorage.setItem("accessToken", token.data.access_token);
      localStorage.setItem("refreshToken", token.data.refresh_token);
      localStorage.setItem("tokenExpiresIn", token.data.expires_in);
      this.restoreSessionFromLocalStorage();

      this.state = FetchStatus.Done;
      return await Promise.resolve({});
    } catch (error) {
      this.state = FetchStatus.Error;
      return Promise.reject(error);
    }
  }

  async signup(values: RegistrationFormProps): Promise<any> {
    this.state = FetchStatus.Pending;

    try {
      let salt = process.env.REACT_APP_PASSWORD_SALT;
      if (!salt) {
        salt = DEFAULT_PASSWORD_SALT;
      }
      const saltedPass = hashPassword(values.password, salt);

      const formData = new URLSearchParams();
      if (values.name) {
        formData.append("name", values.name);
      }
      formData.append("email", values.email);
      formData.append("password", saltedPass);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/`,
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      this.state = FetchStatus.Done;
      return response;
    } catch (error) {
      this.state = FetchStatus.Error;
      return Promise.reject(error);
    }
  }
}
