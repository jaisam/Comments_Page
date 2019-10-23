import { Component, OnInit, Input, ɵɵresolveBody } from '@angular/core';
import { GetCommentsService } from '../services/get-comments.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment;
  @Input() reply;
  // data;
  constructor(private getCommentsService: GetCommentsService, 
              private appComponent : AppComponent) {
  }

  ngOnInit() {
    if (this.comment) {
      this.comment.type = 'Comment';
      this.comment = this.comment;
      // console.log('comment ', this.comment);
    }
    else if (this.reply) {
      this.reply.type = 'Reply';
      this.comment = this.reply;
      // console.log('reply', this.reply);
    }
  }

  addNewComment(comment) {
    var myParagraph = <HTMLElement>document.createElement('p');
    myParagraph.innerHTML = 'My Paragraph';
    // var body =  <any>document.getElementsByTagName('body');
    document.body.appendChild(myParagraph);
  }

  incrementVote(comment , propertyName)  {
    this.getCommentsService.incrementVote(comment , propertyName)
      .subscribe(data => {
        // console.log(data);
        this.appComponent.fecthAllComments();
      },
      error => {
        console.log(error);
      });
  }
}
