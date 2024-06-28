import { IAppState, Jug, JugChallengeSolution, JugColor } from "./common";

export const initialState: IAppState = {
  jug1: new Jug("1"),
  jug2: new Jug("2"),
  targetAmount: 0,
  bestSolution: new JugChallengeSolution(),
  worstSolution: new JugChallengeSolution(),
  challengesHistory: []
};