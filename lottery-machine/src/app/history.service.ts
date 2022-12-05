import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  twoMatches = 0;
  threeMatches = 0;
  fourMatches = 0;
  fiveMatches = 0;

  numberOfTickets = 0;

  weeks = 0;
  years = 0;

  cost = 0;

  constructor() { }

  addWeek(): void {
    this.weeks++;
    if (this.weeks % 52 === 0) {
      this.years++;
    }
  }

  buyNewTicket(): void {
    this.cost += 300;
  }
 
}
