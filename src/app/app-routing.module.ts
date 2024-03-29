import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSessionComponent } from './create-session/create-session.component';
import { SeesionViewComponent } from './seesion-view/seesion-view.component';

const routes: Routes = [ {path:'home', component:CreateSessionComponent},
{path:'play', component:SeesionViewComponent},
{path:'**',component:CreateSessionComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
