import { JugActionType } from "../enums/jugActionType";

export interface IJugChallengeSolutionStep {
    jug1WaterLevel: number;
    jug2WaterLevel: number;
    action: JugActionType;
}