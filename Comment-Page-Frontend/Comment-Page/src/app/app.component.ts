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
      this.hideLogOut = !this.hideLogOut;
      this.hideSignUp = !this.hideSignUp;
      this.hideSignIn = !this.hideSignIn;
    }

    logOut() {
      console.log('Inside Logout');
      localStorage.removeItem('userToken');
      this.hideButton();
    }
  }


