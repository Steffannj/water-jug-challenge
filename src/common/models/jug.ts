import { JugState } from './../enums/jugState';
import { IJug } from "../interfaces/IJug";
import { JugColor } from '../enums/jugColor';

export class Jug implements IJug {
    id: string;
    state: JugState;
    capacity: number;
    color: JugColor;

    constructor(id: string, color?: JugColor) {
        this.id = id;
        this.color = color;
        this.state = JugState.Empty;
    }
}