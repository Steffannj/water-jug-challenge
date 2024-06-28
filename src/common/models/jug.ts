import { JugState } from './../enums/jugState';
import { IJug } from "../interfaces/IJug";
import { JugColor } from '../enums/jugColor';

export class Jug implements IJug {
    id: string;
    state: JugState;
    capacity: number;
    color: JugColor;
    waterLevel: number;

    constructor(id: string, color?: JugColor) {
        this.id = id;
        this.color = color;
        this.state = JugState.Empty;
    }

    setCapacity(capacity: number) {
        this.capacity = capacity;
    }

    setState(state: JugState) {
        this.state = state;
    }

    setColor(color: JugColor) {
        this.color = color;
    }
}