import { IJugChallengeSolution } from "../interfaces/IJugChallengeSolution";
import { JugChallengeSolutionStep } from "./jugChallengeSolutionStep";

export class JugChallengeSolution implements IJugChallengeSolution {
    steps: Array<JugChallengeSolutionStep>;
}