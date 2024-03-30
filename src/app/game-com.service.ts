import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class GameComService {
  private socket  = io('http://18.61.71.250:3000',  {rejectUnauthorized: false});
  private user = {};
  private roomID = '';
  private sessionState:any = {};
  deleteCookie = false;
 

  constructor() { }

  setUser(user: string) {
    this.user=  user;
  }

  getUser() {
    return this.user;
  }

  setRoomId(roomId:string) {
    this.roomID = roomId;
  }
  
  getRoomID() {
    return this.roomID;
  }

  setSessionState(sessionState:any) {
    this.sessionState = sessionState;
  }

  getSessionState() {
    return this.sessionState;
  }

  createSession(username:string) {
    this.socket.emit("create-session",{username});
  }

  sessionCreated() :Observable<any> {
    const sessionCreated = new Observable(subscriber => {
      this.socket.on("session-created",({gameState, user}) => {
        subscriber.next({ gameState, user});
        subscriber.complete();
          });
    });
   return sessionCreated;
  }

  joinSession(username:string, roomID:string, cookie:boolean) {
    this.socket.emit("join-session",{username, roomID, cookie});
  }

  sessionJoined () :Observable<any>{
    const sessionJoined = new Observable<any>(subscriber => {
      this.socket.on("existing-game-state", data => {
        subscriber.next(data);
      });
    });
    return sessionJoined;
  }

  playerJoined (): Observable<any> {
    const playerJoined = new Observable(subscriber => {
      this.socket.on("player-joined", (data) => {
        subscriber.next(data);
      });
    });
    return playerJoined;
  }

  errorListener(): Observable<any> {
    const errorListener = new Observable(subscriber => {
      this.socket.on("custom-error", data => {
        subscriber.next(data);
      });
    });
    return errorListener;
  }

  infoListener(): Observable<any> {
    const infoListener = new Observable(subscriber => {
      this.socket.on("custom-info", (data) => {
        subscriber.next(data);
      });
    });
    return infoListener;
  }

  createPrediction(roomID:string,user:any, predictionObject:any) {
    this.socket.emit("create-prediction",{roomID, user, predictionObject});
  }

  predictionObject() {
    const predictionObject = new Observable<any> (subscriber => {
      this.socket.on("prediction-object", (data) => {
        subscriber.next(data);
      });
    });
    return predictionObject;
  }

  predictionCall(roomID:string, choice:any, user:any) {
    this.socket.emit("prediction-call", {roomID, choice, user});
  }


  predictionUpdate() {
    const predictionUpdate = new Observable<any> (subscriber =>{
      this.socket.on("prediction-update",(data)=> {
        subscriber.next(data);
      });
    });
    return predictionUpdate;
  }

  correctChoice(roomID:string, correctChoice:any, user:any) {
    this.socket.emit("correct-choice", {roomID, correctChoice, user});
  }

  predictionResult() {
    const predResult = new Observable<any> (subscriber => {
      this.socket.on("prediction-result", (data) => {
        subscriber.next(data);
      });
    });
    return predResult;
  }

  //game-play
  lockPoll(user:any, roomID:string, lockPoll:boolean ) {
    this.socket.emit("game-play", ({user, roomID, lockPoll }));
  }


  lockPollTimer() {
    const lockPollTimer = new Observable<any> (subscriber => {
      this.socket.on("lock-poll-timer",(data) => {
        subscriber.next(data);
      });
    });
    return lockPollTimer;
  }

  deletePoll(user:any) {
    this.socket.emit("delete-poll", ({user}));
  }

   //data usersList, team A | B
  pollLocked() {
    const pollLocked = new Observable<any> (subscriber => {
      this.socket.on("poll-locked",(data) =>{
        subscriber.next(data);
      });
    });
    return pollLocked;
  }

  pollDeleted() {
    const pollDeleted = new Observable<any> (subscriber => {
      this.socket.on("deleted-poll", (data)=> {
        subscriber.next(data);
      });
    });
    return pollDeleted;
  }

  onMessage() {
    const messageRecived = new Observable<any> (subscriber => {
      this.socket.on("message", (data) => {
        subscriber.next(data);
      });
    });
    return messageRecived;
  }

  sendMessage(user:any, message:string) {
    this.socket.emit("message", ({user, message}));
  }

  //removedUser: User, team: A | B, usersList:User[],
  //newCaptain:User, captainChanged:boolean
  playerDisconnected() {
    const playerDisconnected = new Observable<any> (subscriber => {
      this.socket.on("user-disconnected", data => {
        subscriber.next(data);
      });
    });
    return playerDisconnected;
  }
 
  disconnect() {
    this.socket.disconnect();
    this.socket = io('http://192.168.228.137:3000');
  }

}
