import { newInstanceForScope, resolve } from "aurelia";
import { Store } from "@aurelia/store-v1";
import { IValidationController } from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { IJug, Jug, JugColor, JugService, calculate } from "../../common";
import { JugDetails } from "../../custom-elements/jugDetails/jugDetails";

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
        this.jugService.registerActions();
        this.jug1 = new Jug("1", JugColor.Blue);
        this.jug2 = new Jug("2", JugColor.Red);
        this.targetAmount = 0;
    }

    bound() {
        this.setupValidationRules();
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
                return value >= this.jug1.capacity && value <= this.jug2.capacity;
            })
            .withMessage(`Target Amount must be between or equal to Jug 1 and Jug 2 capacities.`)
    }

    async isTargetAmountValid(): Promise<boolean> {
        const res = await this.validationController.validate();
        return res.valid;
    }

    async calculate() {
        const isValid = await this.jug1ComponentRef.isCapacityValid() && await this.jug2ComponentRef.isCapacityValid() && await this.isTargetAmountValid()
        if (isValid) {
            this.store.dispatch(calculate, this.jug1, this.jug2, this.targetAmount)
        }
    }
}