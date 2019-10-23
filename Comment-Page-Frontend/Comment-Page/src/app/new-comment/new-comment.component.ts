import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetCommentsService } from '../services/get-comments.service';
import { Comment } from '../Models/Comment';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  dataSaved = false;
  commentForm = this.formBuilder.group({
    description: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
                 private GetCommentsService: GetCommentsService,
                 private appComponent : AppComponent) {

  }

  ngOnInit() {
  }

  onFormSubmit() {
    this.dataSaved = false;
    let comment = this.commentForm.value;
    // console.log(comment);
    this.addComment(comment);
  }

  addComment(comment) {
    this.GetCommentsService.addComment(comment)
      .subscribe(data => {
        this.dataSaved = true;
        this.appComponent.fecthAllComments();
      },
        error => {
          console.log(error);
        });
  }

}
