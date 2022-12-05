import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  numberPool: number[] = [];
  winningNumbers: number[] = [];
  userNumbers: number[] = [];
  matchedNumbers = 0;

  userNumbersForm = new FormGroup({
    firstNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    secondNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    thirdNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    fourthNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    fifthNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)])
  });
  
  constructor(public historyService: HistoryService) {}
  
  ngOnInit(): void {
    
  }

  start(): void {
    this.resetNumbers();
    this.historyService.numberOfTickets++;
    this.historyService.buyNewTicket();
    this.historyService.addWeek();
    for (let i = 0; i < 5; i++) {
      const numberIndex = this.getRandomInt(0, this.numberPool.length -1);
      this.winningNumbers.push(this.numberPool[numberIndex]);
      this.numberPool.splice(numberIndex, 1);
    }
    this.winningNumbers.sort();
    this.checksMatches()
    console.log(this.winningNumbers, this.numberPool);
  } 

  getRandomInt(min: number, max: number): number {       
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return this.getRandomInt(min, max);
    return min + (byteArray[0] % range);
  }

  resetNumbers(): void {
    this.winningNumbers = [];
    this.numberPool = [];
    this.matchedNumbers = 0;
    Array.from(document.getElementsByClassName('matched-number')).forEach(element => {
      element.classList.remove('matched-number');
    });
    for (let i = 1; i < 91; i++) {
      this.numberPool.push(i);
    }
    console.log(this.numberPool);
  }

  addUserNumber(formControlName: string): void {
    if (this.userNumbers.includes(this.userNumbersForm.get(formControlName)?.value)) {
      this.userNumbersForm.get(formControlName)?.setErrors({'incorrect': true});
    }
    this.userNumbers = [];
    Object.keys(this.userNumbersForm.controls).forEach(key => {
      this.userNumbers.push(this.userNumbersForm.get(key)?.value);
      console.log(this.userNumbers);
    });
  }

  checksMatches(): void {
    Object.keys(this.userNumbersForm.controls).forEach(key => {
      if (this.winningNumbers.includes(this.userNumbersForm.get(key)?.value)) {
        document.getElementById(key)?.classList.add('matched-number');
        this.matchedNumbers++;
      }
    });
    if (this.matchedNumbers === 2) {
      this.historyService.twoMatches++;
    } else if (this.matchedNumbers === 3) {
      this.historyService.threeMatches++;
    } else if (this.matchedNumbers === 4) {
      this.historyService.fourMatches++;
    } else if (this.matchedNumbers === 5) {
      this.historyService.fiveMatches++;
    }
  }
  
}
