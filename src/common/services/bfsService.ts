import { JugActionType } from "../enums";
import { IJug, IJugChallengeSolution } from "../interfaces";
import { JugChallengeSolutionStep } from "../models";

export class BfsService {
    private seenScenarios: Set<string>; // Seen scenarios that we need to skip to avoid infinite loop
    private solutions: IJugChallengeSolution[];
    private queueOfPossibleScenarios: any[];

    constructor() {
        this.init();
    }

    private init() {
        this.seenScenarios = new Set();
        this.solutions = [];
        this.queueOfPossibleScenarios = [{ jug1WaterLevel: 0, jug2WaterLevel: 0, steps: new Array<JugChallengeSolutionStep>() }];
    }

    findSolutions(jug1: IJug, jug2: IJug, targetAmount: number): IJugChallengeSolution[] {
        this.init();
        while (this.queueOfPossibleScenarios.length > 0) {
            let { jug1WaterLevel, jug2WaterLevel, steps } = this.queueOfPossibleScenarios.shift();

            // If this scenario has already been seen, skip it
            if (this.isScenarioSeen(jug1WaterLevel, jug2WaterLevel))
                continue;

            // Mark this scenario as seen
            this.seenScenarios.add(`${jug1WaterLevel},${jug2WaterLevel}`);

            // Check if we have reached the target
            const isTargetReached = jug1WaterLevel === targetAmount || jug2WaterLevel === targetAmount;
            if (isTargetReached) {
                this.solutions.push({ steps: steps });
                continue;
            }

            // Generate all possible states with actions
            const possibleStates = this.createAllPosibleStatesForCurrentStep(jug1, jug1WaterLevel, jug2, jug2WaterLevel);
            for (const state of possibleStates) {
                if (!this.isScenarioSeen(state.x, state.y) && !this.isScenarioAlreadyInQueue(state.x, state.y))
                    this.queueOfPossibleScenarios.push(
                        {
                            jug1WaterLevel: state.x,
                            jug2WaterLevel: state.y,
                            steps: [...steps, { jug1WaterLevel: state.x, jug2WaterLevel: state.y, action: state.action }]
                        }
                    );
            }
        }
        return this.solutions;
    }

    private isScenarioSeen(jug1WaterLevel, jug2WaterLevel) {
        return this.seenScenarios.has(`${jug1WaterLevel},${jug2WaterLevel}`);
    }

    private isScenarioAlreadyInQueue(jug1WaterLevel, jug2WaterLevel) {
        return this.queueOfPossibleScenarios.some(s => s.jug1WaterLevel == jug1WaterLevel && s.jug2WaterLevel == jug2WaterLevel);
    }

    private createAllPosibleStatesForCurrentStep(jug1: IJug, jug1WaterLevel: number, jug2: IJug, jug2WaterLevel: number) {
        return [
            { x: jug1.capacity, y: jug2WaterLevel, action: JugActionType.FillJug1 },
            { x: jug1WaterLevel, y: jug2.capacity, action: JugActionType.FillJug2 },
            { x: 0, y: jug2WaterLevel, action: JugActionType.EmptyJug1 },
            { x: jug1WaterLevel, y: 0, action: JugActionType.EmptyJug2 },
            {
                x: jug1WaterLevel - Math.min(jug1WaterLevel, jug2.capacity - jug2WaterLevel),
                y: jug2WaterLevel + Math.min(jug1WaterLevel, jug2.capacity - jug2WaterLevel),
                action: JugActionType.PourJug1IntoJug2
            },
            {
                x: jug1WaterLevel + Math.min(jug2WaterLevel, jug1.capacity - jug1WaterLevel),
                y: jug2WaterLevel - Math.min(jug2WaterLevel, jug1.capacity - jug1WaterLevel),
                action: JugActionType.PourJug2IntoJug1
            }
        ]
    }
}