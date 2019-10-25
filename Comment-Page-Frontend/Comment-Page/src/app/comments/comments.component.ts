import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  hideParagraph = false;
  hideTextArea = true;
  @ViewChild('newComment', { static: false })
  private newCommentRef: ElementRef;

  constructor(private getCommentsService: GetCommentsService,
    private appComponent: AppComponent,
    private renderer: Renderer2) {
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

  updFlags(comment) {
    // const newComment = <HTMLElement>document.createElement('app-new-comment');
    // // newComment.innerHTML = 'My Paragraph';
    // // var body =  <any>document.getElementsByTagName('body');
    // console.log(newComment);
    // document.body.appendChild(newComment);
    console.log('inside updFlags');
    this.hideParagraph = !this.hideParagraph;
    this.hideTextArea = !this.hideTextArea;
  };

  updateDescription(comment, newDescription) {
    // console.log(comment , newDescription);

    this.hideTextArea = !this.hideTextArea;
    comment.description = newDescription;
     console.log(comment);
    this.getCommentsService.updateDescription(comment)
      .subscribe(data => {
        console.log(data);
        this.hideParagraph = !this.hideParagraph;
        this.appComponent.fecthAllComments();
      }, error => {
        console.log(error);
      });
  }

  incrementVote(comment, propertyName) {
    this.getCommentsService.incrementVote(comment, propertyName)
      .subscribe(data => {
        // console.log(data);
        this.appComponent.fecthAllComments();
      },
        error => {
          console.log(error);
        });
  }
}
