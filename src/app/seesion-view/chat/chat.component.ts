import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GameComService } from 'src/app/game-com.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() user: any;
  messages:any  = [];
  message='';

  @ViewChild('chatWindow') scrollableDiv!: ElementRef;

  constructor(private gameComService: GameComService) { }

  ngOnInit() {
    this.gameComService.onMessage().subscribe(data => {
      let message = data.user.username + " -- " + data.message;
      this.messages.push(message);
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollableDiv.nativeElement.scrollTop = this.scrollableDiv.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if(this.message.length > 0) {
    this.gameComService.sendMessage(this.user, this.message);
    }
    this.message = '';
  }
}
