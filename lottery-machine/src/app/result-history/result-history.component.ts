import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryService } from '../history.service';
import { Matches } from '../utils';

@Component({
  selector: 'app-result-history',
  templateUrl: './result-history.component.html',
  styleUrls: ['./result-history.component.scss']
})
export class ResultHistoryComponent implements OnDestroy {

  matches: Matches = {
    twoMatches: 0,
    threeMatches: 0,
    fourMatches: 0,
    fiveMatches: 0,
  }

  matchChangesSub: Subscription = new Subscription;

  constructor(private historyService: HistoryService) {
    this.matchChangesSub = this.historyService.matchesSubject.subscribe(resp => {
      console.log(resp);
      this.matches = resp;
    })
  }

  ngOnDestroy(): void {
    this.matchChangesSub.unsubscribe();
  }


}
