export interface Event {
  _id: string;
  name: string;
  categories: Array<Category>;
  date: {
    start: Date;
    end: Date;
  };
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Participant {
  _id: string;
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  birthday: Date;
  phone: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id: string;
  name: {
    short: string;
    long: string;
  };
  description?: string;
  participantsNumber: {
    min: number;
    max: number;
  };
  minCheckpoints: number;
  maxTime: number;
  price: number;
  activeTime: {
    open: Date;
    close: Date;
  };
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Team {
  _id: string;
  name: string;
  participants: Array<Participant>;
  event: string;
  category: Category;
  extraMapRequired?: boolean;
  amountPaid?: number;
  note?: string;
  routes: Array<Route>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TagAssignment {
  _id: string;
  tag: number;
  participant: Participant["_id"];
  event: Event["_id"];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum StationType {
  Regular = "regular",
  Clear = "clear",
  Start = "start",
  Finish = "finish",
}

export interface Station {
  _id: string;
  number: number;
  enabled: boolean;
  stationType: StationType;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CheckpointCostMetric {
  Points = "points",
  Seconds = "seconds",
  Minutes = "minutes",
  Hours = "hours",
}

export interface Location {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  water?: boolean;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Checkpoint {
  _id: string;
  event: Event["_id"];
  category: Category["_id"];
  location: Location["_id"];
  station: Station["_id"];
  required: boolean;
  checkOrder: boolean;
  order: number;
  cost: number;
  costMetric: CheckpointCostMetric;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TeamRouteStatusType {
  None = "none",
  Starting = "starting",
  OnRoure = "running",
  Finishing = "finishing",
  Finished = "finished",
  Disqualified = "disqualified",
}

export interface TeamRouteStatus {
  type: TeamRouteStatusType;
  message?: string;
}

export interface TeamResults {
  _id: string;
  name: string;
  event: string;
  category: Category;
  participants: Array<Participant>;
  extraMapRequired?: boolean;
  amountPaid?: number;
  routes: Array<Route>;
  start: Date | null;
  finish: Date | null;
  clearTime: number | null; // in seconds
  checkpoints: number;
  totalTime: number | null;
  points?: number;
  status: TeamRouteStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RouteAction {
  _id: string;
  station: string;
  timestamp: Date;
}

export interface Route {
  _id: string;
  tagAssignment: string;
  start: Date;
  finish: Date;
  actions: [RouteAction];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum FetchStatus {
  Pending,
  Done,
  Error,
}
