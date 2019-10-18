import { Component, OnInit } from '@angular/core';
import { GetCommentsService } from './services/get-comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  allComments;

  constructor(private getcomments: GetCommentsService) { }

  ngOnInit() {

    this.getcomments.getAllComments()
      .subscribe(data => {
        this.allComments = data;
        // console.log(this.allComments[0].replies);
      });
  }

  addComment(description: any) {
    console.log(description);
  }
}

