import { Component, EventEmitter, Input, Output } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-display-prediction',
  templateUrl: './display-prediction.component.html',
  styleUrls: ['./display-prediction.component.css']
})
export class DisplayPredictionComponent {

  @Input() predictionObject: any;
  @Input() showUserList: boolean = false;
  @Output() submitRespose = new EventEmitter<any>;
  radioSelect = 'pmga';
  keys:any= [];
  disableRadio = false;
  timer = 15;

  constructor() {}

  ngOnInit() {
    this.keys = Object.keys(this.predictionObject.predictionOptions);
    if(!this.showUserList) {
    this.startTimer();
    }
  }

  startTimer() {
    const number = interval(1000).pipe(take(16));
    number.subscribe(number => {
      this.timer = 15 - number;
      if(number === 15) {
        this.disableRadio = true;
        this.sendResponse();
      }
    });
  }

  sendResponse() {
    this.submitRespose.emit(this.radioSelect);
  }

}
