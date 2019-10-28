import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetCommentsService } from '../services/get-comments.service';
import { Comment } from '../Models/Comment';
import { CommentsListComponent } from '../comments-list/comments-list.component';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  dataSaved = false;
  // parentComment is populated only when createComponent() is called to create NewCommentComponent when reply button is clicked in CommentComponent.
  // It stores data of parentComment on which reply is called.
  parentComment;


  constructor(private formBuilder: FormBuilder,
                private GetCommentsService: GetCommentsService,
                  private commentsListComponent: CommentsListComponent) {}


  ngOnInit() {}


//[start] Trigerred when Post button is clicked, checks if new comment needs to be added or new reply
  onFormSubmit(desc) {
    // console.log('parentComment ', this.parentComment);
    this.dataSaved = false;
    let comment;
    if (this.parentComment) {
      // If parentComment is passed from createComponent, it means reply needs to be added. 
      // type property is set to 'Reply'. commentId property is set to id of parentComment so that parent comment is updated as well in backend.
      comment = {
        description: desc,
        type: 'Reply',
        commentId: this.parentComment._id
      };
    }
    else {
      // If parentComment is not passed from createComponent, it means new comment needs to be added. 
      // type property is set to 'Comment' so that in service routes of 'Comment' are used.
      comment = {
        description: desc,
        type: 'Comment'
      }
    }
    // console.log(comment);
    this.addComment(comment);
  }
//[end] Trigerred when Post button is clicked, checks if new comment needs to be added or new reply


//[start] Called from onFormSubmit function, makes call to service function
  addComment(comment) {
    this.GetCommentsService.addComment(comment)
      .subscribe(data => {
        this.dataSaved = true;
        this.commentsListComponent.fecthAllComments();
      },
        error => {
          console.log(error);
        });
  }
//[end] Called from onFormSubmit function, makes call to service function


}
