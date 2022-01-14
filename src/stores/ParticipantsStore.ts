import axios from "axios";
import { makeAutoObservable, action } from "mobx";
import env from "react-dotenv";

import { Participant, FetchStatus } from "src/types";

export default class ParticipantsStore {
  participants: Array<Participant> = [];

  state = FetchStatus.Pending;

  constructor() {
    makeAutoObservable(this);
    this.fetch();
  }

  fetch(): void {
    this.state = FetchStatus.Pending;

    axios
      .get(`${env.API_URL}/participants/`)
      .then(
        action("fetchParticipantsSucceeded", (response) => {
          this.participants = response.data;
          this.state = FetchStatus.Done;
        })
      )
      .catch(
        action("fetchParticipantsFailed", (error) => {
          this.state = FetchStatus.Error;
          console.log(error);
        })
      );
  }

  async add(participant: Participant): Promise<any> {
    try {
      const response = await axios.post(
        `${env.API_URL}/participants/`,
        participant
      );

      this.fetch();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(participant: Participant): Promise<any> {
    try {
      const response = await axios.delete(
        `${env.API_URL}/participants/${participant._id}`
      );

      this.fetch();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(participant: Participant, values: any): Promise<any> {
    try {
      const response = await axios.patch(
        `${env.API_URL}/participants/${participant._id}`,
        values
      );

      this.fetch();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  isPending(): boolean {
    return this.state === FetchStatus.Pending;
  }
}
