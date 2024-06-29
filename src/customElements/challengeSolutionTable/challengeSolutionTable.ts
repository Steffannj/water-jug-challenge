import { bindable } from "aurelia";
import { IChallengeSolution } from "../../common";

export class ChallengeSolutionTable {
    @bindable solution: IChallengeSolution;
}