import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
    { path : 'signup' , component : SignupComponent },
    { path : 'signin' , component : SigninComponent },
    { path : 'comments-list' ,
     component : CommentsListComponent 
      //, canActivate : [AuthGuardService] 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
