import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {

  base_url = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  getAllComments(): Observable<any> {
    const server_url = this.base_url + '/comment';
    // console.log(server_url);
    return this.http.get<any>(server_url);
  };

  addComment(comment): Observable<any> {

    const server_url = this.base_url + '/comment';
    console.log(server_url);

    comment.userName = "ZZZZ";
    comment.userImage = "zzzzz";

    console.log('Inside Service', comment);
    return this.http.post<any>(server_url, comment);
  };


  incrementVote(comment, propertyName): Observable<any> {
    let server_url;
    if (comment.type === "Comment") {
      server_url = this.base_url + '/comment/incrementVote/' + comment._id;
    }
    else if (comment.type === "Reply") {
      server_url = this.base_url + '/reply/incrementVote/' + comment._id;
    }
    // console.log(server_url);

    const params = new HttpParams()
      .set('propertyName', propertyName);

    return this.http.patch<any>(server_url, comment, { params });
  };


  updateDescription(comment) :Observable<any> {
    let server_url;
    if (comment.type === "Comment") {
      server_url = this.base_url + '/comment/' + comment._id;
    }
    else if (comment.type === "Reply") {
      server_url = this.base_url + '/reply/' + comment._id;
    }

    console.log(server_url);
    return this.http.patch<any>(server_url , comment);    
  }
}
