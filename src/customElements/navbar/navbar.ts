import { pluck } from 'rxjs';
import { connectTo } from "@aurelia/store-v1";
import { IChallenge } from '../../common';
import { IDisposable, IEventAggregator, resolve } from 'aurelia';
import { RouterNavigationEndEvent } from '@aurelia/router';

/* eslint-disable */
@connectTo({
    selector: {
        challengesHistory: (store: any) => store.state.pipe(pluck('challengesHistory'))
    }
})
export class Navbar {
    isHistoryRouteActive: boolean;
    isHistoryButtonVisible: boolean;
    navigationEndSub: IDisposable;
    challengesHistory: IChallenge[];

    constructor(
        readonly ea: IEventAggregator = resolve(IEventAggregator)
    ) {
    }

    bound() {
        this.navigationEndSub = this.ea.subscribe('au:router:navigation-end', (payload: RouterNavigationEndEvent) => {
            this.isHistoryRouteActive = payload.navigation.path == 'history';
            this.updateHistoryButtonVisibility();
        });
    }

    detaching() {
        this.navigationEndSub.dispose();
    }

    challengesHistoryChanged(state: IChallenge[]) {
        this.challengesHistory = state;
        this.updateHistoryButtonVisibility();
    }

    private updateHistoryButtonVisibility() {
        this.isHistoryButtonVisible = this.challengesHistory.length && !this.isHistoryRouteActive;
    }
}