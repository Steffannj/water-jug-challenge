import { IJug } from './../interfaces/IJug';
import { JugActionType } from "../enums/jugActionType";
import { IAppState } from "../interfaces/IAppState";
import { IJugChallengeSolution } from '../interfaces';

export function calculate(currentState: IAppState, jug1: IJug, jug2: IJug, targetCapacity: number) {
  let seenScenarios = new Set();
  let solutions: IJugChallengeSolution[] = [];
  let queue = [{ jug1WaterLevel: 0, jug2WaterLevel: 0, actions: [] }];

  while (queue.length > 0) {

    let { jug1WaterLevel: jug1WaterLevel, jug2WaterLevel: jug2WaterLevel, actions } = queue.shift();

    // If this scenario has already been seen, skip it
    if (seenScenarios.has(`${jug1WaterLevel},${jug2WaterLevel}`))
      continue;

    // Mark this scenario as seen
    seenScenarios.add(`${jug1WaterLevel},${jug2WaterLevel}`);

    // Check if we have reached the target
    if (jug1WaterLevel === targetCapacity || jug2WaterLevel === targetCapacity) {
      solutions.push({ steps: actions });
      continue;
    }

    // Generate all possible states with actions
    let possibleStates = [
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
    ];

    for (let state of possibleStates) {
      if (!seenScenarios.has(`${state.x},${state.y}`))
        queue.push({ jug1WaterLevel: state.x, jug2WaterLevel: state.y, actions: [...actions, { jug1WaterLevel: state.x, jug2WaterLevel: state.y, action: state.action }] });
    }
  }

  // Find the best (shortest) and worst (longest) solution
  if (solutions.length === 0) {
    console.log("No solution found.");
    return;
  }

  let bestSolution = solutions.reduce((a, b) => (a.steps.length <= b.steps.length ? a : b));
  let worstSolution = solutions.reduce((a, b) => (a.steps.length >= b.steps.length ? a : b));

  console.log(bestSolution);

  console.log("Best Solution (Shortest):");
  bestSolution.steps.forEach(action => console.log(action));
  console.log("\nWorst Solution (Longest):");
  worstSolution.steps.forEach(action => console.log(action));
  currentState.bestSolution = bestSolution;
  currentState.worstSolution = worstSolution;
  return currentState;
}