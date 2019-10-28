import { Component, OnInit, ɵConsole } from '@angular/core';

// import { TokenInterceptor } from './auth/token.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hideLogOut = true;
  hideSignUp = false;
  hideSignIn = false;
  constructor() { }

  ngOnInit() {
  }

  hideButton(){
    console.log('inside HideButton');
      this.hideLogOut = false;
      this.hideSignUp = true;
      this.hideSignIn = true;
    }

    logOut() {
      localStorage.removeItem('userToken');
    }
  }


