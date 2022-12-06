import { Component, OnDestroy } from '@angular/core';
import { HistoryService } from '../history.service';
import { PlayingHistory } from '../utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playing-history',
  templateUrl: './playing-history.component.html',
  styleUrls: ['./playing-history.component.scss']
})
export class PlayingHistoryComponent implements OnDestroy {

  playingHistory: PlayingHistory= {
    cost: 0,
    tickets: 0,
    years: 0
  }

  purchaseSub: Subscription = new Subscription;


  constructor(private historyService: HistoryService) {
    this.purchaseSub = this.historyService.purchaseSubject.subscribe(resp => {
      console.log(resp);
      this.playingHistory = resp;
    });
  }

  ngOnDestroy(): void {
    this.purchaseSub.unsubscribe();
  }

}
