import { JugActionType } from "../enums/jugActionType";

export interface IChallengeSolutionStep {
    jug1WaterLevel: number;
    jug2WaterLevel: number;
    action: JugActionType;
}