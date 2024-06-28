import { Home } from "./pages/home/home";
import { ResultsHistory } from "./pages/resultsHistory/resultsHistory";

export class MyApp {
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

}
