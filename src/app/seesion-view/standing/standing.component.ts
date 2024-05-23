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
  usersArray:any = [];

  constructor() { }

  ngOnInit() {
    if(this.users) {
      console.log(this.users);
      this.keys = Object.keys(this.users);
      console.log(this.keys);
      this.convertToArray();
      this.sortUsersArray();
    }
    
  }
  ngOnChanges() {
    if(this.users) {
    console.log(this.users);
    this.keys = Object.keys(this.users);
    this.convertToArray();
    this.sortUsersArray();
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

  convertToArray() {
    this.usersArray = [];
    this.keys.forEach( (key: string | number) => {
      this.usersArray.push(this.users[key]);
    });
    console.log(this.usersArray);
  }

  sortUsersArray() {
    this.usersArray.sort((userA: any, userB:any) => 
      userB.points - userA.points);
      console.log(this.usersArray);
    }
}
