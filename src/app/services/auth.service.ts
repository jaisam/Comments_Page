import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // server_base_url = 'https://comment-page-backend.herokuapp.com';  //environment.base_url;
  server_base_url = environment.base_url;
  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(User): Observable<any> {
    const server_url = this.server_base_url + '/User/login';
    // console.log(User, server_url);
    return this.http.post<any>(server_url, User);
  }

  signUp(User): Observable<any> {
    const server_url = this.server_base_url + '/User/signup';
    // console.log(server_url);
    return this.http.post<any>(server_url, User);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    else return false;
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }

}
