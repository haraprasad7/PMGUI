import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateSessionComponent } from './create-session/create-session.component';
import { SeesionViewComponent } from './seesion-view/seesion-view.component';
import { CreatePredictionComponent } from './seesion-view/create-prediction/create-prediction.component';
import { DisplayPredictionComponent } from './seesion-view/display-prediction/display-prediction.component';
import { StandingComponent } from './seesion-view/standing/standing.component';
import { GameHeaderComponent } from './game-header/game-header.component';
import { UsernameAlphaDirective } from './username-alpha.directive';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { HostDisplayPredictionComponent } from './seesion-view/host-display-prediction/host-display-prediction.component';
import { GameLoggerComponent } from './seesion-view/game-logger/game-logger.component';
import { ChatComponent } from './seesion-view/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSessionComponent,
    SeesionViewComponent,
    CreatePredictionComponent,
    DisplayPredictionComponent,
    StandingComponent,
    GameHeaderComponent,
    UsernameAlphaDirective,
    HostDisplayPredictionComponent,
    GameLoggerComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
