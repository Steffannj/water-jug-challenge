import { bindable } from "aurelia";
import { IJugChallengeSolution } from "../../common";

export class ChallengeSolutionTable {
    @bindable solution: IJugChallengeSolution;
}