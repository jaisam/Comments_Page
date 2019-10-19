import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {GetCommentsService} from '../services/get-comments.service';
import {Comment} from '../Models/Comment';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  dataSaved = false;
  commentForm = this.formBuilder.group({
    desc: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private GetCommentsService: GetCommentsService) {

  }

  ngOnInit() {
  }

  onFormSubmit() {
    this.dataSaved = false;
    let comment = {
      description: this.commentForm.value
    };
    console.log(comment);
    console.log('inside onFormSubmit  ||| comment ', comment, ' ||| dataSaved flag ', this.dataSaved);
    this.addComment(comment);
  }

  addComment(comment) {
    console.log('Inside new-component ||| comment ', comment, ' ||| dataSaved flag ', this.dataSaved);
    this.GetCommentsService.addComment(comment)
      .subscribe(data => {
          this.dataSaved = true;
          console.log('Inside subscribe ||| data ', data, ' ||| dataSaved flag ', this.dataSaved);
        },
        err => {
          console.log(err);
        });
  }

}
