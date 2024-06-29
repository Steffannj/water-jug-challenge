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
            .then()
            .satisfies((value) => {
                const jug1Capacity = this.challenge.jug1.capacity;
                const jug2Capacity = this.challenge.jug2.capacity;

                if (jug1Capacity < jug2Capacity)
                    return value >= jug1Capacity && value <= jug2Capacity;
                else if (jug1Capacity > jug2Capacity)
                    return value <= jug1Capacity && value >= jug2Capacity;
            })
            .withMessage(`Target Amount must be between or equal to Jug 1 and Jug 2 capacities.`)
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