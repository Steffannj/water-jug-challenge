import { JugActionType } from "../enums";
import { IChallengeSolution, IChallengeSolutionStep } from "../interfaces";

export class BfsService {
    private seenScenarios: Set<string>; // Seen scenarios that we need to skip to avoid infinite loop
    private solutions: IChallengeSolution[];
    private queueOfPossibleScenarios: { jug1WaterLevel: number, jug2WaterLevel: number, stepsTaken: IChallengeSolutionStep[] }[];

    constructor() {
        this.init();
    }

    private init() {
        this.seenScenarios = new Set();
        this.solutions = [];
        this.queueOfPossibleScenarios = [{ jug1WaterLevel: 0, jug2WaterLevel: 0, stepsTaken: [] }];
    }

    findSolutions(jug1Capacity: number, jug2Capacity: number, targetAmount: number): IChallengeSolution[] {
        this.init();

        while (this.queueOfPossibleScenarios.length > 0) {
            const { jug1WaterLevel, jug2WaterLevel, stepsTaken } = this.queueOfPossibleScenarios.shift();

            // Mark this scenario as seen
            this.seenScenarios.add(`${jug1WaterLevel},${jug2WaterLevel}`);

            // Check if we have reached the target
            const isTargetReached = jug1WaterLevel === targetAmount || jug2WaterLevel === targetAmount;
            if (isTargetReached) {
                this.solutions.push({ steps: stepsTaken });
                continue;
            }

            // Generate all possible steps with actions
            const possibleSteps = this.createAllPosibleSteps(jug1Capacity, jug1WaterLevel, jug2Capacity, jug2WaterLevel);
            for (const step of possibleSteps)
                if (!this.isScenarioSeen(step) && !this.isScenarioAlreadyInQueue(step))
                    this.addScenarioToQueue(step, stepsTaken);
        }

        return this.solutions;
    }

    private addScenarioToQueue(step: IChallengeSolutionStep, steps: IChallengeSolutionStep[]) {
        this.queueOfPossibleScenarios.push(
            {
                jug1WaterLevel: step.jug1WaterLevel,
                jug2WaterLevel: step.jug2WaterLevel,
                stepsTaken: [...steps, { jug1WaterLevel: step.jug1WaterLevel, jug2WaterLevel: step.jug2WaterLevel, action: step.action }]
            }
        );
    }

    private isScenarioSeen(step: IChallengeSolutionStep) {
        return this.seenScenarios.has(`${step.jug1WaterLevel},${step.jug2WaterLevel}`);
    }

    private isScenarioAlreadyInQueue(step: IChallengeSolutionStep) {
        return this.queueOfPossibleScenarios.some(s => s.jug1WaterLevel == step.jug1WaterLevel && s.jug2WaterLevel == step.jug2WaterLevel);
    }

    private createAllPosibleSteps(jug1Capacity: number, jug1WaterLevel: number, jug2Capacity: number, jug2WaterLevel: number): IChallengeSolutionStep[] {
        return [
            { jug1WaterLevel: jug1Capacity, jug2WaterLevel: jug2WaterLevel, action: JugActionType.FillJug1 },
            { jug1WaterLevel: jug1WaterLevel, jug2WaterLevel: jug2Capacity, action: JugActionType.FillJug2 },
            { jug1WaterLevel: 0, jug2WaterLevel: jug2WaterLevel, action: JugActionType.EmptyJug1 },
            { jug1WaterLevel: jug1WaterLevel, jug2WaterLevel: 0, action: JugActionType.EmptyJug2 },
            {
                jug1WaterLevel: jug1WaterLevel - Math.min(jug1WaterLevel, jug2Capacity - jug2WaterLevel),
                jug2WaterLevel: jug2WaterLevel + Math.min(jug1WaterLevel, jug2Capacity - jug2WaterLevel),
                action: JugActionType.PourJug1IntoJug2
            },
            {
                jug1WaterLevel: jug1WaterLevel + Math.min(jug2WaterLevel, jug1Capacity - jug1WaterLevel),
                jug2WaterLevel: jug2WaterLevel - Math.min(jug2WaterLevel, jug1Capacity - jug1WaterLevel),
                action: JugActionType.PourJug2IntoJug1
            }
        ]
    }
}