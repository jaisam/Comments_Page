import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {

  constructor(private http : HttpClient) { }

  getAllComments() : Observable<Comment[]>{
    const server_url = 'http://localhost:9000/comments';
    console.log(server_url);
    return this.http.get<Comment[]>(server_url);
  }

}
