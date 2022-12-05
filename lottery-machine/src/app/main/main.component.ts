import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  numberPool: number[] = [];
  winningNumbers: number[] = [];

  userNumbersForm = new FormGroup({
    firstNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    secondNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    thirdNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    fourthNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)]),
    fifthNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(90)])
  });
  
  constructor() {}
  
  ngOnInit(): void {
    
  }

  start(): void {
    this.resetNumbers();
    for (let i = 0; i < 5; i++) {
      const numberIndex = this.getRandomInt(0, this.numberPool.length -1);
      this.winningNumbers.push(this.numberPool[numberIndex]);
      this.numberPool.splice(numberIndex, 1);
    }
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
    for (let i = 1; i < 91; i++) {
      this.numberPool.push(i);
    }
    console.log(this.numberPool);
  }

  addUserNumber(formControl: FormControl): void {
    console.log(formControl);
  }
}
