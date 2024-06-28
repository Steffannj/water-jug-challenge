import { Store, connectTo } from "@aurelia/store-v1";
import { newInstanceForScope, resolve } from "aurelia";
import { IValidationController } from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { IChallenge, IJug, JugService } from "../../common";
import { JugDetails } from "../../custom-elements/jugDetails/jugDetails";
import { pluck } from "rxjs";

@connectTo({
    selector: (store: any) => store.state.pipe(pluck('currentChallenge'))
})
export class Home {
    jug1: IJug;
    jug2: IJug;
    targetAmount: number;
    jug1ComponentRef: JugDetails;
    jug2ComponentRef: JugDetails;

    constructor(
        readonly jugService = resolve(JugService),
        readonly store = resolve(Store),
        private validationController = resolve(newInstanceForScope(IValidationController)),
        private validationRules = resolve(IValidationRules)
    ) {
    }

    bound() {
        this.setupValidationRules();
    }

    stateChanged(currentChallenge: IChallenge) {
        this.jug1 = structuredClone(currentChallenge.jug1);
        this.jug2 = structuredClone(currentChallenge.jug2);
        this.targetAmount = currentChallenge.targetAmount;
    }

    private setupValidationRules() {
        this.validationRules
            .on(this)
            .ensure('targetAmount')
            .required()
            .then()
            .min(1)
            .then()
            .max(100)
            .then()
            .satisfies((value) => {
                if (this.jug1.capacity < this.jug2.capacity)
                    return value >= this.jug1.capacity && value <= this.jug2.capacity;
                else if (this.jug1.capacity > this.jug2.capacity)
                    return value <= this.jug1.capacity && value >= this.jug2.capacity;
            })
            .withMessage(`Target Amount must be between or equal to Jug 1 and Jug 2 capacities.`)
    }

    async isTargetAmountValid(): Promise<boolean> {
        const res = await this.validationController.validate();
        return res.valid;
    }

    async tryToFindSolutions() {
        if (await this.areAllInputsValid())
            this.jugService.findSolutions(this.jug1, this.jug2, this.targetAmount);
    }

    private async areAllInputsValid() {
        return await this.jug1ComponentRef.isCapacityValid() && await this.jug2ComponentRef.isCapacityValid() && await this.isTargetAmountValid();
    }
}