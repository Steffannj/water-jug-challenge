import { IJug } from "./IJug";
import { IJugChallengeSolution } from "./IJugChallengeSolution";

export interface IChallenge {
    jug1: IJug;
    jug2: IJug;
    targetAmount: number;
    bestSolution: IJugChallengeSolution;
    worstSolution: IJugChallengeSolution;
    noSolutionsFound: boolean;
}