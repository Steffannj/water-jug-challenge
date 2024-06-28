import { JugActionType } from "../enums/jugActionType";
import { IJugChallengeSolutionStep } from "../interfaces/IJugChallengeSolutionStep";

export class JugChallengeSolutionStep implements IJugChallengeSolutionStep {
    jug1WaterLevel: number;
    jug2WaterLevel: number;
    action: JugActionType;
}

