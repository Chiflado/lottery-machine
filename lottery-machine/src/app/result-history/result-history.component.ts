import { Component } from '@angular/core';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-result-history',
  templateUrl: './result-history.component.html',
  styleUrls: ['./result-history.component.scss']
})
export class ResultHistoryComponent {

  constructor(public historyService: HistoryService) {}


}
