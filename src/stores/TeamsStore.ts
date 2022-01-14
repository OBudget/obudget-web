import axios from "axios";
import { makeAutoObservable, action } from "mobx";
import env from "react-dotenv";

import { Event, Team, FetchStatus } from "src/types";

export default class TeamsStore {
  teams: Array<Team> = [];

  eventId: string | undefined = undefined;

  state = FetchStatus.Pending;

  constructor() {
    makeAutoObservable(this);
  }

  fetch(event?: Event | null): void {
    this.state = FetchStatus.Pending;

    if (event) {
      this.eventId = event._id;
    }

    if (this.eventId) {
      axios
        .get(`${env.API_URL}/teams/?event=${this.eventId}`)
        .then(
          action("fetchTeamsSucceeded", (response) => {
            this.teams = response.data;
            this.state = FetchStatus.Done;
          })
        )
        .catch(
          action("fetchTeamsFailed", (error) => {
            this.state = FetchStatus.Error;
            console.log(error);
          })
        );
    } else {
      this.teams = [];
    }
  }

  async add(team: Team): Promise<any> {
    try {
      const response = await axios.post(`${env.API_URL}/teams/`, team);

      this.fetch();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(team: Team): Promise<any> {
    try {
      const response = await axios.delete(`${env.API_URL}/teams/${team._id}`);

      this.fetch();

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(team: Team, values: any): Promise<any> {
    try {
      const response = await axios.patch(
        `${env.API_URL}/teams/${team._id}`,
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
