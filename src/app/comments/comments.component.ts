import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { GetCommentsService } from '../services/get-comments.service';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { NewCommentComponent } from '../new-comment/new-comment.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment;
  @Input() reply;
  @Input() loggedInUser;
  hideParagraph = false;
  hideTextArea = true;// Part#1 of creating dynamic component
  @ViewChild('newComment', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(private getCommentsService: GetCommentsService,
    private commentsListComponent: CommentsListComponent,
    private resolver: ComponentFactoryResolver,
    private authService: AuthService ,
    private router : Router) {
  }

  ngOnInit() {
    if (this.comment) {
      // If comment is passed from commentsListComponent, then set comment.type = 'Comment' so that this type property will be used to hit comment routes
      this.comment.type = 'Comment';
      this.comment = this.comment;
      console.log('Inside comment' , this.comment);
    }
    if (this.reply) {
      // If reply is passed from commentsListComponent, then set reply.type = 'Reply' so that this type property will be used to hit comment routes
      // Also assigning reply object to comment object because, comments.component.html uses comment object to display data
      this.comment = this.reply;
      this.comment.type = 'Reply';
      console.log('Inside reply' , this.comment);

    }
    // console.log(this.comment);
  }


  //[start] When Edit button is clicked, this function will hide paragraph and display textarea
  updFlags(comment) {
    if (!this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
        window.alert("Please Login to edit a comment");
        this.router.navigate(['/signin']);      
    }
    else {
      this.getCommentsService.getLoggedInUser()
        .subscribe(data => {
          const loggedInUserName = data.firstName + ' ' + data.lastName;
          const commenterName = comment.userName;
          //checks if commenter is same as comment editor then only allow to edit
          if (commenterName === loggedInUserName) {
            this.hideParagraph = !this.hideParagraph;
            this.hideTextArea = !this.hideTextArea;
          }
          else {
            window.alert("You dont have permission to edit Comment");
          }
        },
          error => {
            console.log(error);
          });
    }
  };
  //[end] When Edit button is clicked, this function will hide paragraph and display textarea


  //[start] When Edit button is clicked, text area is displayed, If user presses enter key in text area , this function is called
  updateDescription(comment, newDescription) {
    // console.log(comment , newDescription);
    this.hideTextArea = !this.hideTextArea;
    comment.description = newDescription;
    console.log(comment);
    this.getCommentsService.updateDescription(comment)
      .subscribe(data => {
        // console.log(data);
        this.hideParagraph = !this.hideParagraph;
        this.commentsListComponent.fecthAllComments();
      }, error => {
        console.log(error);
      });
  }
  //[end] When Edit button is clicked, text area is displayed, If user presses enter key in text area , this function is called


  //[start] When increment button is clicked, this function is called
  incrementVote(comment, propertyName) {
    if (!this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
        window.alert("Please Login to increment vote");
        this.router.navigate(['/signin']);
    }
    else {
      this.getCommentsService.incrementVote(comment, propertyName)
        .subscribe(data => {
          this.commentsListComponent.fecthAllComments();
        },
          error => {
            console.log(error);
          });
    }
  }
  //[end] When increment button is clicked, this function is called


  //[start] When reply button is clicked, dynamically NewCommentComponent is created and displayed
  //Part #2 of creating dynamic component
  createComponent(parentComment) {
    if (!this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
        window.alert("Please Login to add a reply");
        this.router.navigate(['/signin']);
    }
    else {
      this.entry.clear();
      const factory = this.resolver.resolveComponentFactory(NewCommentComponent);
      let componentRef = this.entry.createComponent(factory);
      componentRef.instance.parentComment = parentComment;
    }
  }
  //[end] When reply button is clicked, dynamically NewCommentComponent is created and displayed


}
