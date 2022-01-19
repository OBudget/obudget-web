import axios from "axios";
import crypto from "crypto-js";
import { makeAutoObservable } from "mobx";

import { FetchStatus } from "src/types";

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

  accessToken: string | undefined = undefined;

  refreshToken: string | undefined = undefined;

  tokenExpiresIn: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async login(values: LoginFormProps): Promise<any> {
    this.state = FetchStatus.Pending;

    try {
      let salt = process.env.REACT_APP_PASSWORD_SALT;
      if (!salt) {
        salt = DEFAULT_PASSWORD_SALT;
      }
      const saltedPass = hashPassword(values.password, salt);

      const authData = {
        grant_type: "password",
        username: values.email,
        password: saltedPass,
        client_id: process.env.REACT_APP_CLIENT_ID,
      };

      const token = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/token/`,
        authData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      console.log(token);

      // this.accessToken = token.access_token;
      // this.tokenExpiresIn = token.expires_in;
      // this.refreshToken = token.refresh_token;
      // this.authenticated = true;

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

      const user: RegistrationFormProps = {
        name: values.name,
        email: values.email,
        password: saltedPass,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/`,
        user,
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
