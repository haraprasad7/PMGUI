import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent {
  @Input() users:any = {} ;
  @ViewChild('standing') scrollableDiv!: ElementRef;
  keys:any = [];

  constructor() { }

  ngOnInit() {
    if(this.users) {
      this.keys = Object.keys(this.users);
      }
  }
  ngOnChanges() {
    if(this.users) {
    this.keys = Object.keys(this.users);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollableDiv.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

}
