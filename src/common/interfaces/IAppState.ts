import { IJug } from "./IJug";
import { IJugChallengeSolution } from "./IJugChallengeSolution";

export interface IAppState {
    jug1: IJug,
    jug2: IJug,
    targetAmount: number,
    bestSolution: IJugChallengeSolution,
    worstSolution: IJugChallengeSolution,
    challengesHistory: Array<Omit<IAppState, 'challengesHistory'>>
}