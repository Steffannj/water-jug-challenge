import { Store, connectTo } from "@aurelia/store-v1";
import { pluck } from "rxjs";
import { IChallenge, IChallengeSolution, removeChallengeFromHistory } from "../../common";
import { resolve } from "aurelia";

/* eslint-disable */
@connectTo({
    selector: {
        challengesHistory: (store: any) => store.state.pipe(pluck('challengesHistory'))
    }
})
export class ResultsHistory {
    challengesHistory: IChallenge[];
    selectedChallenge: IChallenge;

    constructor(private store = resolve(Store)) {
    }

    removeChallenge(challenge: IChallenge) {
        this.store.dispatch(removeChallengeFromHistory, challenge);
    }

    selectChallenge(challenge: IChallenge) {
        this.selectedChallenge = challenge;
    }
}