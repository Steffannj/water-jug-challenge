import { JugColor } from "../enums/jugColor";
import { JugState } from "../enums/jugState";

export interface IJug {
    id: string;
    capacity: number;
    state: JugState;
    color: JugColor;
    amountFilled: number;

    setCapacity(capacity: number): void;
    setState(state: JugState): void;
}