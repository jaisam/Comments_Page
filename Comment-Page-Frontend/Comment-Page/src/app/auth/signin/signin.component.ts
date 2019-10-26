import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  setHidden = true;
  message;
  @Output() userData = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onFormSubmit(form) {
    const Email = form.value.Email
    const Password = form.value.Password;

    let User = {
      email: Email,
      password: Password
    }
    // console.log(Email, Password, User);
    this.login(User);
  }

  login(User) {
    this.authService.login(User)
      .subscribe(data => {
         console.log(data);
        this.message = data.msg;
        this.setHidden = false;
        this.Timeout();
        this.userData.emit(data);
        localStorage.setItem('userToken' , data.token);
      },
        error => {
          // console.log(error.error.msg);
          this.message = error.error.msg;
          this.setHidden = false;
          this.Timeout();
        });
  }

  Timeout() {
    setTimeout(() => { this.setHidden = true }, 3000);
  }

}
