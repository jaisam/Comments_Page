import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {
  
  base_url = 'http://localhost:9000';


  constructor(private http: HttpClient) { 
  }

 
//[start] this function getAllComments by calling get fucntion of comment route  
  getAllComments(): Observable<any> {
    const server_url = this.base_url + '/comment';
    // console.log(server_url);
    return this.http.get<any>(server_url);
  };
//[end] this function getAllComments by calling get fucntion of comment route  


//[start] This function adds new comment by calling post function of comment route or new reply by calling post function of reply route
  addComment(comment): Observable<any> {
    let server_url;
    if (comment.type === "Comment") {
      // if it is new comment, call post route of Comment.js
      server_url = this.base_url + '/comment';
    }
    else if (comment.type === "Reply") {
      // if it is new reply, call post route of Comment.js
      server_url = this.base_url + '/reply';
    }
    comment.userName = "ZZZZ";
    comment.userImage = "zzzzz";
    // console.log(comment , server_url);
    return this.http.post<any>(server_url, comment);
  };
//[end] This function adds new comment by calling post function of comment route or new reply by calling post function of reply route


//[start] This function increments upvote/downvote of both comment/reply by checking type property
  incrementVote(comment, propertyName): Observable<any> {
    let server_url;
    if (comment.type === "Comment") {
      // if it is comment, call incrementVote route of Comment.js
      server_url = this.base_url + '/comment/incrementVote/' + comment._id;
    }
    else if (comment.type === "Reply") {
      // if it is reply, call incrementVote route of Comment.js
      server_url = this.base_url + '/reply/incrementVote/' + comment._id;
    }
    // console.log(server_url);
    const params = new HttpParams()
      .set('propertyName', propertyName);
    return this.http.patch<any>(server_url, comment, { params });
  };
//[end] This function increments upvote/downvote of both comment/reply


//[start] This function updates description of comment/reply by checking type property
  updateDescription(comment): Observable<any> {
    let server_url;
    if (comment.type === "Comment") {
      // if type='Comment', it means description of comment needs to be updated so call patch function of comment route.
      server_url = this.base_url + '/comment/' + comment._id;
    }
    else if (comment.type === "Reply") {
       // if type='Reply', it means description of reply needs to be updated so call patch function of reply route.
      server_url = this.base_url + '/reply/' + comment._id;
    }
    // console.log(server_url);
    return this.http.patch<any>(server_url, comment);
  }
//[end] This function updates description of comment/reply by checking type property


}
