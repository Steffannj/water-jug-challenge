import { resolve } from 'aurelia';
import { Store } from "@aurelia/store-v1";
import { IChallenge, IJug, IJugChallengeSolution } from '../interfaces';
import { handleNoSolutionsFound, updateCurrentChallengeState, updateHistory } from '../actionHandlers/jugChallengeActionHandlers';
import { BfsService } from './bfsService';
import { Challenge } from '../models';

export class JugService {

    constructor(
        readonly store = resolve(Store),
        readonly bfs = resolve(BfsService),
    ) {
    }

    registerActions() {
        this.store.registerAction('updateSolutionsState', updateCurrentChallengeState);
        this.store.registerAction('handleNoSolutionsFound', handleNoSolutionsFound);
        this.store.registerAction('updateHistory', updateHistory);
    }

    findSolutions(jug1: IJug, jug2: IJug, targetAmount: number): void {
        const solutions = this.bfs.findSolutions(jug1, jug2, targetAmount);
        if (solutions.length) {
            const slns = this.getBestAndWorstSolution(solutions);
            const challenge = this.getCurrentChallenge(jug1, jug2, targetAmount, slns[0], slns[1]);
            this.store
                .pipe(updateCurrentChallengeState, challenge)
                .pipe(updateHistory, challenge)
                .dispatch();
        }
        else
            this.store
                .pipe(handleNoSolutionsFound)
                .pipe(updateCurrentChallengeState, this.getCurrentChallenge(jug1, jug2, targetAmount, undefined, undefined))
                .dispatch();
    }

    private getBestAndWorstSolution(solutions: IJugChallengeSolution[]): IJugChallengeSolution[] {
        const bestSolution = solutions.reduce((a, b) => (a.steps.length <= b.steps.length ? a : b));
        const worstSolution = solutions.reduce((a, b) => (a.steps.length >= b.steps.length ? a : b));
        return [bestSolution, worstSolution];
    }

    private getCurrentChallenge(
        jug1: IJug,
        jug2: IJug,
        targetAmount: number,
        bestSln: IJugChallengeSolution,
        worstSln: IJugChallengeSolution
    ) {
        let challenge = new Challenge();
        challenge.jug1 = jug1;
        challenge.jug2 = jug2;
        challenge.targetAmount = targetAmount;
        challenge.bestSolution = bestSln;
        challenge.worstSolution = worstSln;
        return challenge;
    }
}