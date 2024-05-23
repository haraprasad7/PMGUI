import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-create-prediction',
  templateUrl: './create-prediction.component.html',
  styleUrls: ['./create-prediction.component.css']
})
export class CreatePredictionComponent {
  @Output() submitPollEvent = new EventEmitter<any>;
  @Output() deletePollEvent = new EventEmitter<any>;
  @Input() predExists = false;

  constructor() {

  }
  pollTitle = '';
  pollOptionsA = '';
  pollOptionsB = '';
  pollOptionsC = '';
  pollOptionsD = '';
  tracker = 1;
  hideAddButton = false;
  showSub = false;
  points = 2;
  createPoll = false;

  addOption() {
    if (this.tracker < 4) {
      this.showSub = true;
      this.tracker = this.tracker + 1;
    }
    if (this.tracker === 4) {
      this.hideAddButton = true;
    }
  }

  subOption() {
    if (this.tracker > 1) {
      this.hideAddButton = false;
      this.tracker = this.tracker - 1;
    }
    if (this.tracker === 1) {
      this.showSub = false;
    }
    if (this.tracker === 3) {
      this.pollOptionsD = '';
    }
    if (this.tracker === 2) {
      this.pollOptionsC = '';
    }
    if (this.tracker === 1) {
      this.pollOptionsB = '';
    }
  }

  submitPoll() {
    let options = [];
    if (this.tracker === 1) {
      options.push({ optionText: this.pollOptionsA, optionId: 'pmga' });
    }
    if (this.tracker === 3) {
      options.push({ optionText: this.pollOptionsA, optionId: 'pmga' });
      options.push({ optionText: this.pollOptionsB, optionId: 'pmgb' });
      options.push({ optionText: this.pollOptionsC, optionId: 'pmgc' });
    }
    if (this.tracker === 2) {
      options.push({ optionText: this.pollOptionsA, optionId: 'pmga' });
      options.push({ optionText: this.pollOptionsB, optionId: 'pmgb' });
    }
    if (this.tracker === 4) {
      options.push({ optionText: this.pollOptionsA, optionId: 'pmga' });
      options.push({ optionText: this.pollOptionsB, optionId: 'pmgb' });
      options.push({ optionText: this.pollOptionsC, optionId: 'pmgc' });
      options.push({ optionText: this.pollOptionsD, optionId: 'pmgd' });
    }

    if (this.pollTitle.length > 0 && this.pollOptionsA.length > 0) {
      let predictionObject = {
        predictionTitle: this.pollTitle,
        predictionOptions: [...options],
        predictionPoint: this.points > 5 ? 5 : this.points
      }
      this.submitPollEvent.emit(predictionObject);
      this.createPoll = false;
    }
  }

  createPollClick() {
    if (!this.predExists) {
      this.pollOptionsA = '';
      this.pollOptionsB = '';
      this.pollOptionsC = '';
      this.pollOptionsD = '';
      this.pollTitle = '';
      this.tracker = 1;
      this.hideAddButton = false;
      this.showSub = false;
      this.createPoll = true;
    }
  }

  deletePoll() {
    this.deletePollEvent.emit();
  }
}
