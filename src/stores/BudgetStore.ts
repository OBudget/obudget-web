import axios from "axios";
import { makeAutoObservable } from "mobx";

import { FetchStatus } from "src/types";
import { UserStore } from "src/stores";

export default class BudgetStore {
  state = FetchStatus.Done;

  user: UserStore;

  constructor(store: UserStore) {
    makeAutoObservable(this);
    this.user = store;
  }

  async import({ provider, file }: { provider: string; file: File }) {
    this.state = FetchStatus.Pending;

    try {
      const fileData = new FormData();
      fileData.append("file", file);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/budget/import/${provider}`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${this.user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      this.state = FetchStatus.Done;
      return await Promise.resolve({});
    } catch (error) {
      this.state = FetchStatus.Error;
      return Promise.reject(error);
    }
  }
}
