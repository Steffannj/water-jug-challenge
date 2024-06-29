import { resolve } from 'aurelia';
import { Store } from "@aurelia/store-v1";
import { IChallenge, IChallengeSolution } from '../interfaces';
import { handleNoSolutionsFound, updateCurrentChallengeSolutions, addChallengeToHistory, removeChallengeFromHistory } from '../actionHandlers/challengeActionHandlers';
import { BfsService } from './bfsService';
import { IJugService } from '../interfaces/IJugService';

export class JugService implements IJugService {

    constructor(
        readonly store = resolve(Store),
        readonly bfs = resolve(BfsService),
    ) {
    }

    registerActions() {
        this.store.registerAction('updateCurrentChallengeSolutions', updateCurrentChallengeSolutions);
        this.store.registerAction('handleNoSolutionsFound', handleNoSolutionsFound);
        this.store.registerAction('addChallengeToHistory', addChallengeToHistory);
        this.store.registerAction('removeChallengeFromHistory', removeChallengeFromHistory);
    }

    findSolutions(challenge: IChallenge) {
        const solutions = this.bfs.findSolutions(challenge.jug1.capacity, challenge.jug2.capacity, challenge.targetAmount);
        if (solutions.length)
            this.handleSolutionsFound(solutions, challenge);
        else
            this.store.dispatch(handleNoSolutionsFound);
    }

    private handleSolutionsFound(solutions: IChallengeSolution[], challenge: IChallenge) {
        const slns = this.getBestAndWorstSolution(solutions);
        this.store
            .pipe(updateCurrentChallengeSolutions, slns)
            .pipe(addChallengeToHistory, challenge)
            .dispatch();
    }

    private getBestAndWorstSolution(solutions: IChallengeSolution[]): IChallengeSolution[] {
        const bestSolution = solutions.reduce((a, b) => (a.steps.length <= b.steps.length ? a : b));
        const worstSolution = solutions.reduce((a, b) => (a.steps.length >= b.steps.length ? a : b));
        return [bestSolution, worstSolution];
    }
}