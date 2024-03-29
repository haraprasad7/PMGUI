import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-logger',
  templateUrl: './game-logger.component.html',
  styleUrls: ['./game-logger.component.css']
})
export class GameLoggerComponent {
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;

  @Input() messages: any;

 

  constructor() { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollableDiv.nativeElement.scrollTop = this.scrollableDiv.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
