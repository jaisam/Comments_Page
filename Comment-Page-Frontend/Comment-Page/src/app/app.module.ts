import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LoginComponent } from './auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    NewCommentComponent,
    SignupComponent,
    SigninComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewCommentComponent,SignupComponent,SigninComponent]
})
export class AppModule { }
