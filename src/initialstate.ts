import { Challenge, IAppState } from "./common";

export const initialState: IAppState = {
  currentChallenge: new Challenge(),
  challengesHistory: []
};