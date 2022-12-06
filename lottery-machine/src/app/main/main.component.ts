import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  numberPool: number[] = [];
  winningNumbers: number[] = [];
  userNumbers: number[] = [];
  matchedNumbers = 0;
  isRandom = false;
  speed = 1;

  userNumbersForm = new UntypedFormGroup({
    firstNumber: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    secondNumber: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    thirdNumber: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    fourthNumber: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    fifthNumber: new UntypedFormControl('', [Validators.required, Validators.min(1), Validators.max(90)])
  });
  
  constructor(private historyService: HistoryService) {}
  
  start(): void {
    this.resetNumbers();
    this.historyService.buyNewTicket();
    let counter = 0;
    let interval = setInterval(() => {
      const numberIndex = this.getRandomInt(0, this.numberPool.length -1);
      this.winningNumbers.push(this.numberPool[numberIndex]);
      this.numberPool.splice(numberIndex, 1);
      counter++;
      if (counter === 5) {
        this.winningNumbers = this.winningNumbers.sort(function(a, b) {return a-b});
        this.checksMatches()
        clearInterval(interval);
      }
    }, this.speed);
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
    this.isRandom = false;
    this.winningNumbers = [];
    this.numberPool = [];
    this.matchedNumbers = 0;
    Array.from(document.getElementsByClassName('matched-number')).forEach(element => {
      element.classList.remove('matched-number');
    });
    for (let i = 1; i < 91; i++) {
      this.numberPool.push(i);
    }
  }

  getFiveNumbers(): number[] {
    let randomNUmbers = [];
    for (let i = 0; i < 5; i++) {
      const numberIndex = this.getRandomInt(0, this.numberPool.length -1);
      randomNUmbers.push(this.numberPool[numberIndex]);
      this.numberPool.splice(numberIndex, 1);
    }
    randomNUmbers = randomNUmbers.sort(function(a, b) {return a-b});
    return randomNUmbers;
  }

  randomize(): void {
    this.resetNumbers();
    this.isRandom = true;
    this.userNumbers = this.getFiveNumbers();
    let counter = 0;
    Object.keys(this.userNumbersForm.controls).forEach(key => {
      this.userNumbersForm.get(key)?.setValue(this.userNumbers[counter]);
      counter++;
    });
  }

  addUserNumber(formControlName: string): void {
    if (!this.isRandom) {
      this.resetNumbers();
      if (this.userNumbers.includes(this.userNumbersForm.get(formControlName)?.value)) {
        this.userNumbersForm.get(formControlName)?.setErrors({'incorrect': true});
      }
      this.userNumbers = [];
      Object.keys(this.userNumbersForm.controls).forEach(key => {
        this.userNumbers.push(this.userNumbersForm.get(key)?.value);
      });
    }
  }

  checksMatches(): void {
    Object.keys(this.userNumbersForm.controls).forEach(key => {
      if (this.winningNumbers.includes(this.userNumbersForm.get(key)?.value)) {
        document.getElementById(key)?.classList.add('matched-number');
        this.matchedNumbers++;
      }
    });
    if (this.matchedNumbers > 1) {
      this.historyService.gotMatches(this.matchedNumbers);
    }
  }
  
}
