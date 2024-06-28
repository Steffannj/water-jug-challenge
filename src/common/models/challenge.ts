import { JugColor } from "../enums";
import { IChallenge, IJug, IJugChallengeSolution } from "../interfaces";
import { Jug } from "./jug";

export class Challenge implements IChallenge {
    jug1: IJug;
    jug2: IJug;
    targetAmount: number;
    bestSolution: IJugChallengeSolution;
    worstSolution: IJugChallengeSolution;
    noSolutionsFound: boolean;

    constructor() {
        this.jug1 = new Jug("1", JugColor.Blue);
        this.jug2 = new Jug("2", JugColor.Red);
        this.noSolutionsFound = false;
    }
}