import { Component, Input, OnInit } from '@angular/core';
import { IRecipe, IUser } from 'src/app/interfaces';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  @Input() recipe!: IRecipe;
  @Input() recipeOwner!: IUser;

  user?: IUser | null;

  commentForm!: FormGroup;
  commentLoading = false;
  commentSubmitted = false;
  commentError?: string;
  commentHide = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.user = null;
    }

    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });

    // console.log(this.user);
  }

  onCommentSubmit(): void {
    alert(this.commentForm.controls['comment'].value);

    this.commentForm.reset();
  }

}
