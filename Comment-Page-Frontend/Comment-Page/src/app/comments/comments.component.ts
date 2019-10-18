import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment;
  constructor() { }

  ngOnInit() {
    //  console.log(this.comment.editedDescription[0].Description);
  }

  // addNewComment(){
  //   currentComment = document.getElementById()
  // }
}
