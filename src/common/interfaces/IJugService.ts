import { IChallenge } from "./IChallenge";
import { JugService } from "../services";
import { DI } from "aurelia";

export const IJugService = DI.createInterface<IJugService>('IJugService', x => x.singleton(JugService));

export interface IJugService {
    registerActions(): void;
    findSolutions(challenge: IChallenge): void;
}
