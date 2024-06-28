import { resolve } from "aurelia";
import { JugService } from "./common";
import { Home } from "./pages/home/home";
import { ResultsHistory } from "./pages/resultsHistory/resultsHistory";

export class Shell {
    static routes = [
        {
            path: '',
            component: Home,
            title: 'Home'
        },
        {
            path: 'history',
            component: ResultsHistory,
            title: 'History'
        },
    ];

    constructor(readonly jugService = resolve(JugService)) {
        this.jugService.registerActions();
    }
}
