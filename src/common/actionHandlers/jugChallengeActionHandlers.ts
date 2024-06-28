import { IAppState } from "../interfaces/IAppState";
import { IChallenge } from '../interfaces';

export function updateHistory(currentState: IAppState, currentChallenge: IChallenge) {
  const newState = Object.assign({}, currentState);
  newState.challengesHistory.push(currentChallenge);
  return newState;
}

export function updateCurrentChallengeState(currentState: IAppState, currentChallenge: IChallenge) {
  const newState = Object.assign({}, currentState);
  newState.currentChallenge = currentChallenge;
  return newState;
}

export function handleNoSolutionsFound(currentState: IAppState) {
  const newState = Object.assign({}, currentState);
  newState.currentChallenge.bestSolution = undefined;
  newState.currentChallenge.worstSolution = undefined;
  newState.currentChallenge.noSolutionsFound = true;
  return newState;
}