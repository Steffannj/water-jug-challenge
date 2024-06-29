import { JugColor } from "../enums/jugColor";
import { JugState } from "../enums/jugState";

export interface IJug {
    id: string;
    capacity: number;
    state: JugState;
    color: JugColor;
}