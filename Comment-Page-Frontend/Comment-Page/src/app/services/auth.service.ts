import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  server_base_url = 'http://localhost:9000/';  //process.env.server_base_url;

  
  constructor(private http: HttpClient) { }

  login(User): Observable<any> {
    const server_url = this.server_base_url + 'User/login';
    // console.log(User, server_url);
    return this.http.post<any>(server_url, User);
  }

  signUp(User): Observable<any> {
    const server_url = this.server_base_url + 'User/signup';
    // console.log(server_url);
    return this.http.post<any>(server_url, User);
  }

  getToken(){
    return localStorage.getItem('userToken');
  }
}
