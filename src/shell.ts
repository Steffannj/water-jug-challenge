import { IJugService } from './common';
import { resolve } from "aurelia";
import { Home } from "./pages/home/home";
import { ResultsHistory } from "./pages/resultsHistory/resultsHistory";

export class Shell {
    static routes = [
        {
            path: '',
            component: Home, // Jug Water Challenge route
            title: 'Home'
        },
        {
            path: 'history',
            component: ResultsHistory, // My challenges history
            title: 'History'
        },
    ];

    constructor(readonly jugService: IJugService = resolve(IJugService)) {
        this.jugService.registerActions(); // Registering aurelia store actions 
    }
}
