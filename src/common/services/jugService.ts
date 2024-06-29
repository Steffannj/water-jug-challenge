import { resolve } from 'aurelia';
import { Store } from "@aurelia/store-v1";
import { IChallenge, IJug, IJugChallengeSolution } from '../interfaces';
import { handleNoSolutionsFound, updateCurrentChallengeSolutions, addChallengeToHistory, removeChallengeFromHistory } from '../actionHandlers/jugChallengeActionHandlers';
import { BfsService } from './bfsService';

export class JugService {

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

    findSolutions(challenge: IChallenge): void {
        const solutions = this.bfs.findSolutions(challenge);
        if (solutions.length)
            this.handleSolutionsFound(solutions, challenge);
        else
            this.store.dispatch(handleNoSolutionsFound);
    }

    private handleSolutionsFound(solutions: IJugChallengeSolution[], challenge: IChallenge) {
        const slns = this.getBestAndWorstSolution(solutions);
        this.store
            .pipe(updateCurrentChallengeSolutions, slns)
            .pipe(addChallengeToHistory, challenge)
            .dispatch();
    }

    private getBestAndWorstSolution(solutions: IJugChallengeSolution[]): IJugChallengeSolution[] {
        const bestSolution = solutions.reduce((a, b) => (a.steps.length <= b.steps.length ? a : b));
        const worstSolution = solutions.reduce((a, b) => (a.steps.length >= b.steps.length ? a : b));
        return [bestSolution, worstSolution];
    }
}