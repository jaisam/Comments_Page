import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../Models/Comment';

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

  addComment(comment) : Observable<Comment>{
    const server_url = 'http://localhost:9000/comments';
    comment.userName = "ZZZZ";
    comment.userImage = "zzzzz";
    console.log(comment);
    // comment.description[0].desc = "";
    console.log('Inside Service ||| comment ', comment );
    return this.http.post<Comment>(server_url ,comment);
  }
}
