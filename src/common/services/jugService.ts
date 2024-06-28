import { resolve } from 'aurelia';
import { Store } from "@aurelia/store-v1";
import { calculate } from '../actionHandlers/jugActionHandlers';

export class JugService {

    constructor(readonly store = resolve(Store)) {
    }

    registerActions() {
        this.store.registerAction('calculate', calculate)
    }
}