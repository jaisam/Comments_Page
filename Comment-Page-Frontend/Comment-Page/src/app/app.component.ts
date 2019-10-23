import { Component, OnInit } from '@angular/core';
import { GetCommentsService } from './services/get-comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  allComments;

  constructor(private getCommentsService: GetCommentsService) { }

  ngOnInit() {
    this.fecthAllComments();
  }


  fecthAllComments() {
    this.getCommentsService.getAllComments()
      .subscribe(data => {
        this.allComments = data;
        //  console.log('allComments' , this.allComments);
      });
  }
}

