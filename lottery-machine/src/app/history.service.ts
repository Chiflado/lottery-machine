import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Matches, PlayingHistory } from './utils';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  matches: Matches = {
    twoMatches: 0,
    threeMatches: 0,
    fourMatches: 0,
    fiveMatches: 0,
  }

  playingHistory: PlayingHistory = {
    cost: 0,
    tickets: 0,
    years: 0
  }

  matchesSubject = new BehaviorSubject(this.matches);

  purchaseSubject = new BehaviorSubject(this.playingHistory);

  weeks = 0;

  constructor() { }

  buyNewTicket(): void {
    this.playingHistory.cost += 300;
    this.playingHistory.tickets++;
    this.weeks++;
    if (this.weeks % 52 === 0) {
      this.playingHistory.years++;
    }
    this.purchaseSubject.next(this.playingHistory);
  }

  gotMatches(matchedNumbers: number): void {
    if (matchedNumbers === 2) {
      this.matches.twoMatches++;
    } else if (matchedNumbers === 3) {
      this.matches.threeMatches++;
    } else if (matchedNumbers === 4) {
      this.matches.fourMatches++;
    } else if (matchedNumbers === 5) {
      this.matches.fiveMatches++;
    }
    this.matchesSubject.next(this.matches);
  }
 
}
