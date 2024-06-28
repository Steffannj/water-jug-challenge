import { connectTo } from "@aurelia/store-v1";
import { pluck } from "rxjs";
import { IChallenge } from "../../common";

@connectTo({
    selector: (store: any) => store.state.pipe(pluck('challengesHistory'))
})
export class ResultsHistory {
    stateChanged(challengeHistory: IChallenge[]) {
    }
}