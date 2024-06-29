import { IAppState } from "../interfaces/IAppState";
import { IChallenge, IJugChallengeSolution } from '../interfaces';

export function addChallengeToHistory(currentState: IAppState, currentChallenge: IChallenge) {
  const newState = Object.assign({}, currentState);
  if (!newState.challengesHistory.find(c => JSON.stringify(c) == JSON.stringify(currentChallenge)))
    newState.challengesHistory.push(structuredClone(currentChallenge));
  return newState;
}

export function removeChallengeFromHistory(currentState: IAppState, challenge: IChallenge) {
  const newState = Object.assign({}, currentState);
  newState.challengesHistory = newState.challengesHistory.filter(c => c !== challenge);
  return newState;
}

export function updateCurrentChallengeSolutions(currentState: IAppState, solutions: IJugChallengeSolution[]) {
  const newState = Object.assign({}, currentState);
  newState.currentChallenge.bestSolution = solutions[0];
  newState.currentChallenge.worstSolution = solutions[1];
  newState.currentChallenge.noSolutionsFound = false;
  return newState;
}

export function handleNoSolutionsFound(currentState: IAppState) {
  const newState = Object.assign({}, currentState);
  newState.currentChallenge.bestSolution = undefined;
  newState.currentChallenge.worstSolution = undefined;
  newState.currentChallenge.noSolutionsFound = true;
  return newState;
}