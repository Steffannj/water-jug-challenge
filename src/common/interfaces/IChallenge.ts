import { IJug } from "./IJug";
import { IChallengeSolution } from "./IChallengeSolution";

export interface IChallenge {
    jug1: IJug;
    jug2: IJug;
    targetAmount: number;
    bestSolution: IChallengeSolution;
    worstSolution: IChallengeSolution;
    noSolutionsFound: boolean;
}