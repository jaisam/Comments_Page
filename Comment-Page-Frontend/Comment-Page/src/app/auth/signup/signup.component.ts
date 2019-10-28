import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService , private router : Router) { }

  ngOnInit() {
  }

  setHidden = true;
  message;

  onFormSubmit(Form) {
    let User = {
      firstName: Form.value.firstName,
      lastName: Form.value.lastName,
      company: Form.value.company,
      email: Form.value.email,
      password: Form.value.password,
    }
    // console.log(User);

    this.authService.signUp(User)
      .subscribe(data => {
        // console.log(data.msg);
        this.message = data.msg;
        this.setHidden = false;
        // this.Timeout();
        this.router.navigate(['signin']);
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
