import { bindable } from "aurelia";
import { IJug, JugColor } from "../../common";

export class JugColorPicker {
    @bindable jug: IJug;
    colors: string[];

    bound() {
        this.getAvailableJugColors();
    }

    private getAvailableJugColors() {
        this.colors = Object.values(JugColor).filter(c => c != this.jug.color)
    }

    changeColor(clr: JugColor) {
        this.jug.color = clr;
        this.getAvailableJugColors();
    }
}