import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-playing-history',
  templateUrl: './playing-history.component.html',
  styleUrls: ['./playing-history.component.scss']
})
export class PlayingHistoryComponent {

  constructor(public historyService: HistoryService) {}

}
