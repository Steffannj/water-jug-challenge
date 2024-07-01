import { bindable } from "aurelia";
import { IChallenge } from "../../common";

// Display challenge solutions using bootstrap offcanvas 

export class ChallengeDrawer {
    @bindable challenge: IChallenge;
}