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

  import({ provider, file }: { provider: string; file: File }) {
    this.state = FetchStatus.Pending;

    console.log(file);
    console.log(provider);

    this.state = FetchStatus.Done;
  }
}
