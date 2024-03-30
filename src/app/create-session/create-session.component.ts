import { Component } from '@angular/core';
import { GameComService } from '../game-com.service';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent {

  constructor(private gameComService: GameComService, private router:Router,
    private cookie:CookieService ) {

  }

  createUsername ='';
  joinUsername ='';
  roomNumber ='';
  sessionCreated: Subscription | any;
  sessionJoined: Subscription | any;
  user='';
  room = '';


  ngOnInit() {
    if(this.gameComService.deleteCookie) {
      this.cookie.deleteAll();
      this.gameComService.deleteCookie = false;
    }
    this.room = this.cookie.get('room');
    this.user = this.cookie.get('user');
    if(this.room.length === 5) {
      this.gameComService.joinSession(this.user, this.room, true);
    }
    this.sessionCreated = this.gameComService.sessionCreated().subscribe( data => {
      this.gameComService.setRoomId(data.gameState.roomId);
      this.gameComService.setUser(data.user);
      this.gameComService.setSessionState(data.gameState);
      this.setCookieWithExpiration(data.user.room , data.user.username);
      this.router.navigateByUrl('/play/');
    });

    this.sessionJoined = this.gameComService.sessionJoined().subscribe(data => {
      this.gameComService.setRoomId(data.gameState.roomId);
      this.gameComService.setUser(data.user);
      this.gameComService.setSessionState(data.gameState);
      this.setCookieWithExpiration(data.user.room , data.user.username);
      this.router.navigateByUrl('/play/');
    });
  }

  joinSession() {
    if(this.joinUsername.length > 0 && this.roomNumber.length > 0) {
      this.gameComService.joinSession(this.joinUsername, this.roomNumber, false);
    }
  }

  createSession() {
    if(this.createUsername.length > 0) {
      this.gameComService.createSession(this.createUsername);
    }
  }

  setCookieWithExpiration(room:any, user:any) {
    // Calculate the expiration time
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (4 * 60 * 60 * 1000)); // 4 hours in milliseconds
  
    // Set the cookie with the calculated expiration time
    this.cookie.set('room',room, expirationDate);
    this.cookie.set('user',user, expirationDate);

  }

}
