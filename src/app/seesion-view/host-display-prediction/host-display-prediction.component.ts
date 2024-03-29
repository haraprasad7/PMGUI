import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-host-display-prediction',
  templateUrl: './host-display-prediction.component.html',
  styleUrls: ['./host-display-prediction.component.css']
})
export class HostDisplayPredictionComponent {

  @Input() predictionObject: any;
  @Output() submitAnswerEvent = new EventEmitter<any>;
  radioSelect = '';
  disableRadio = false;
  keys:any= [];

  constructor() {}

  ngOnInit() {
    this.keys = Object.keys(this.predictionObject.predictionOptions);
  }

  optionSelection(event:any) {
    this.disableRadio = true;
  }

  submitAnswer() {
    this.submitAnswerEvent.emit(this.predictionObject);
    
  }


}
