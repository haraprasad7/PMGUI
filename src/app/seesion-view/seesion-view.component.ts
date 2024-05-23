import { Component } from '@angular/core';
import { GameComService } from '../game-com.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seesion-view',
  templateUrl: './seesion-view.component.html',
  styleUrls: ['./seesion-view.component.css']
})
export class SeesionViewComponent {
  user:any;
  roomID = '';
  isHost = false;
  pollExists = false;
  predictionObject:any  = {
  };
  showUserList = false;
  showSubmitAnswers = false;
  livePrediction = false;
  usersGroup:any = {};
  userChoiceAdded:boolean = false;

  logMessages: any= [] ;

  constructor (private gameComService: GameComService, private clipboard: Clipboard,
    private router: Router) {}

  ngOnInit() {
    this.user = this.gameComService.getUser();
    this.isHost = this.user.isHost;
     let message = "Welcome " + this.user.username;
     this.logMessages.push(message)
    if(!this.user.username) {
      this.router.navigateByUrl('/home/');

    }
    this.roomID = this.gameComService.getRoomID();
    this.livePrediction = this.gameComService.getSessionState().livePrediction
    this.pollExists = this.gameComService.getSessionState().livePrediction
    this.usersGroup = this.gameComService.getSessionState().users;
    this.userChoiceAdded = this.gameComService.getSessionState().userChoiceAdded;
    if(this.userChoiceAdded && this.livePrediction && this.user.isHost) {
      this.showSubmitAnswers = true;
    }
    this.predictionObject = this.gameComService.getSessionState().currentPrediction;
    if(this.livePrediction) {
      this.showUserList = true;
    }
    this.gameComService.playerJoined().subscribe(data => {
      let newUser = {
        username:'',
        room:'',
        isHost:false,
        points:0
      };
      newUser.username = data.user.username;
      newUser.points = data.user.points;
      newUser.room = data.user.room;
      if(!data.user.cookie) {
      this.usersGroup = {...this.usersGroup, newUser};
      console.log("added to users group");
      }
      let message = "[JOIN] " + data.user.username +  " Joined the game";
      this.logMessages.push(message);
    });

    this.gameComService.errorListener().subscribe(data => {
      let message = "[ERROR} An error has occurred " + data.errorMessage;
      this.logMessages.push(message);
    });

    this.gameComService.infoListener().subscribe(data => {
      let message = "[INFO] " + data.infoMessage;
      this.logMessages.push(message);
    });

    this.gameComService.predictionObject().subscribe(data => {
      this.pollExists = true;
      this.livePrediction = true;
      this.predictionObject = data.newpredictionObject
      let message = "[POLL] has been created. Make a bet !!";
      this.logMessages.push(message);
    });

    this.gameComService.predictionUpdate().subscribe(data => {
      this.showUserList = true;
      this.predictionObject.predictionOptions[data.predictionChoice].usersList.push(data.user);
      let message = "[PRED] Predictions recived from  " + data.user.username;
      this.logMessages.push(message);
      if(this.isHost && !this.showSubmitAnswers) {
        this.showSubmitAnswers = true;
      }
    });

    this.gameComService.predictionResult().subscribe(data => {
      this.showUserList = false;
      this.pollExists = false;
      this.livePrediction = false;
      this.usersGroup = {...data.result.users}
      let message = "RESULT IS OUT !!! CHECK STANDINGS ";
      this.logMessages.push(message);
    
    });

    this.gameComService.pollDeleted().subscribe(data => {
      if(data === false) {
        this.livePrediction = false;
        this.showUserList = false;
        this.showSubmitAnswers = false;
        this.pollExists = false;
        this.predictionObject = {};
        let message = "The last poll was delted create new poll";
      this.logMessages.push(message);

      }
    });

    this.gameComService.playerDisconnected().subscribe(data => {
      let message = "Sadly a player has left ! and its " + data;
      this.logMessages.push(message);
    });
  }

  pollData(predictionObject:any) {
    this.gameComService.createPrediction(this.roomID, this.user, predictionObject);
  }

  userChoice(choiceId:any) {
    this.gameComService.predictionCall(this.roomID, choiceId, this.user);
  }

  submitAnswer(predictionObject:any) {
    this.showSubmitAnswers = false;
    this.gameComService.correctChoice(this.roomID, predictionObject, this.user);
  }

  deletePoll() {
    if(this.pollExists) {
    this.gameComService.deletePoll(this.user);
    }
  }

  leaveRoom() {
    this.gameComService.deleteCookie = true;
    this.router.navigateByUrl('/home/');
  }
  copy() {
    const successful = this.clipboard.copy(this.roomID);
  }
}
