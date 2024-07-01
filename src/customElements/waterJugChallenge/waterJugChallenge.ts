import { pluck } from 'rxjs';
import { Store, connectTo } from "@aurelia/store-v1";
import { IChallenge, JugService } from '../../common';
import { JugDetails } from '../jugDetails/jugDetails';
import { newInstanceForScope, resolve } from 'aurelia';
import { IValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';

/* eslint-disable */
@connectTo({
    selector: {
        challenge: (store: any) => store.state.pipe(pluck('currentChallenge'))
    }
})
export class WaterJugChallenge {
    challenge: IChallenge;
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

    private setupValidationRules() {
        this.validationRules
            .on(this.challenge)
            .ensure('targetAmount')
            .required()
            .then()
            .min(1)
            .then()
            .max(100)
    }

    async isTargetAmountValid(): Promise<boolean> {
        const res = await this.validationController.validate();
        return res.valid;
    }

    async tryToFindSolutions() {
        if (await this.areAllInputsValid())
            try {
                this.jugService.findSolutions(this.challenge);
            } catch (error) {
                // Notify user that something went wrong
            }
    }

    private async areAllInputsValid() {
        return await this.jug1ComponentRef.isCapacityValid() && await this.jug2ComponentRef.isCapacityValid() && await this.isTargetAmountValid();
    }
}