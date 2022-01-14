import axios from "axios";
import { makeAutoObservable, action } from "mobx";

import { Category, Event, FetchStatus } from "src/types";

export default class EventsList {
  events: Array<Event> = [];

  currentIndex = -1;

  state = FetchStatus.Pending;

  constructor() {
    makeAutoObservable(this);
    this.fetch();
  }

  fetch(): void {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/`)
      .then(
        action("fetchEventsSucceeded", (response) => {
          this.events = response.data;
          this.state = FetchStatus.Done;
          this.currentIndex = this.events.length - 1;
        })
      )
      .catch(
        action("fetchEventsFailed", (error) => {
          this.state = FetchStatus.Error;
          console.log(error);
        })
      );
  }

  isPending(): boolean {
    return this.state === FetchStatus.Pending;
  }

  get currentEvent(): Event | null {
    if (this.events.length === 0) {
      return null;
    }

    return this.events[this.currentIndex];
  }

  get previousEvent(): Event | null {
    if (this.currentEvent !== null && this.currentIndex > 0) {
      return this.events[this.currentIndex - 1];
    }

    return null;
  }

  get nextEvent(): Event | null {
    if (
      this.currentEvent !== null &&
      this.currentIndex + 1 < this.events.length
    ) {
      return this.events[this.currentIndex + 1];
    }

    return null;
  }

  switchToPrevious(): void {
    if (this.previousEvent) {
      this.currentIndex -= 1;
    }
  }

  switchToNext(): void {
    if (this.nextEvent) {
      this.currentIndex += 1;
    }
  }

  get categories(): Array<Category> {
    if (!this.currentEvent) {
      return [];
    }

    return this.currentEvent.categories;
  }
}
