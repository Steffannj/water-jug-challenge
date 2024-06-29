import { JugActionType } from "../../src/common";
import { BfsService } from "../../src/common/services/bfsService";

describe('BfsService', () => {
    let service: BfsService;

    beforeAll(() => {
        service = new BfsService();
    });

    it('should return no solutions for x:2, y:10, z:9', () => {
        const possibleSolutions = service.findSolutions(2, 10, 9);
        expect(possibleSolutions.length).toEqual(0);
    });

    // Assume that we have x:2 y:6 z:4

    // Starting from x:0 y:0 
    it('should add scenario {0,0} as first seen scenario in algorithm', () => {
        service.findSolutions(2, 6, 4);
        expect(service['seenScenarios']).toContain('0,0')
    })

    // Posible scenarios are to fill x and fill y
    it('should add {2,0} as second seen scenario', () => {
        service.findSolutions(2, 6, 4);
        const scenariosIterator = service['seenScenarios'].values();
        scenariosIterator.next();
        expect(scenariosIterator.next().value).toEqual('2,0')
    })

    it('should add {0,6} as second seen scenario', () => {
        service.findSolutions(2, 6, 4);
        const scenariosIterator = service['seenScenarios'].values();
        scenariosIterator.next();
        scenariosIterator.next();
        expect(scenariosIterator.next().value).toEqual('0,6')
    })

    // Continue looping scenarios until one reaches target amount 
    it('should return 2 solutions for x:2, y:6, z:4', () => {
        const solutions = service.findSolutions(2, 6, 4);
        expect(solutions.length).toEqual(2);
    })

    // For each possible scenario in queue we keep track of actions performed to reach the scenario 
    it('should get list of all steps taken to reach our target amount', () => {
        const solutions = service.findSolutions(2, 6, 4);
        const steps = solutions[0].steps;
        expect(steps[0].action).toEqual(JugActionType.FillJug2);
    })

});

