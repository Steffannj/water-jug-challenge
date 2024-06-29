import { bindable, newInstanceForScope, resolve } from "aurelia";
import { IValidationController } from "@aurelia/validation-html";
import { IValidationRules } from "@aurelia/validation";
import { IJug } from "../../common";

export class JugDetails {
    @bindable jug: IJug;

    constructor(
        private validationController = resolve(newInstanceForScope(IValidationController)),
        private validationRules = resolve(IValidationRules)
    ) {
    }

    bound() {
        this.setupValidationRules();
    }

    private setupValidationRules() {
        this.validationRules
            .on(this.jug)
            .ensure('capacity')
            .required()
            .then()
            .min(1)
            .then()
            .max(100)
    }

    public async isCapacityValid(): Promise<boolean> {
        const res = await this.validationController.validate();
        return res.valid;
    }
}