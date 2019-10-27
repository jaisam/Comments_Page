import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { GetCommentsService } from '../services/get-comments.service';
import { AppComponent } from '../app.component';
import { NewCommentComponent } from '../new-comment/new-comment.component';

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
  hideTextArea = true;
  // Part#1 of creating dynamic component
  @ViewChild('newComment', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;


  constructor(private getCommentsService: GetCommentsService,
    private appComponent: AppComponent,
    private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (this.comment) {
      // If comment is passed from AppComponent, then set comment.type = 'Comment' so that this type property will be used to hit comment routes
      this.comment.type = 'Comment';
      this.comment = this.comment;
    }
    else if (this.reply) {
      // If reply is passed from AppComponent, then set reply.type = 'Reply' so that this type property will be used to hit comment routes
      // Also assigning reply object to comment object because, comments.component.html uses comment object to display data
      this.reply.type = 'Reply';
      this.comment = this.reply;
    }
    // console.log(this.comment);
  }


//[start] When Edit button is clicked, this function will hide paragraph and display textarea
  updFlags(comment) {
    this.hideParagraph = !this.hideParagraph;
    this.hideTextArea = !this.hideTextArea;
  };
//[end] When Edit button is clicked, this function will hide paragraph and display textarea


//[start] When Edit button is clicked, text area is displayed, If user presses enter key in text area , this function is called
  updateDescription(comment, newDescription) {
    // console.log(comment , newDescription);
    this.hideTextArea = !this.hideTextArea;
    comment.description = newDescription;
    // console.log(comment);
    this.getCommentsService.updateDescription(comment)
      .subscribe(data => {
        // console.log(data);
        this.hideParagraph = !this.hideParagraph;
        this.appComponent.fecthAllComments();
      }, error => {
        console.log(error);
      });
  }
//[end] When Edit button is clicked, text area is displayed, If user presses enter key in text area , this function is called


//[start] When increment button is clicked, this function is called
  incrementVote(comment, propertyName) {
    this.getCommentsService.incrementVote(comment, propertyName)
      .subscribe(data => {
        this.appComponent.fecthAllComments();
      },
        error => {
          console.log(error);
        });
  }
//[end] When increment button is clicked, this function is called


//[start] When reply button is clicked, dynamically NewCommentComponent is created and displayed
//Part #2 of creating dynamic component
  createComponent(parentComment) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(NewCommentComponent);
    let componentRef = this.entry.createComponent(factory);
    componentRef.instance.parentComment = parentComment;
  }
//[end] When reply button is clicked, dynamically NewCommentComponent is created and displayed


}
