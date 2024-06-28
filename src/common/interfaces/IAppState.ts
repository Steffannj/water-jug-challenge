import { IChallenge } from "./IChallenge";

export interface IAppState {
    currentChallenge: IChallenge,
    challengesHistory: Array<IChallenge>
}