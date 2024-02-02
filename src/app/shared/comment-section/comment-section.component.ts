import { Component, Input, OnInit } from '@angular/core';
import { IRecipe, IUser } from 'src/app/interfaces';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IComments } from 'src/app/interfaces/recipe.interface';
import { RecipeService } from 'src/app/services';

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

  constructor(private formBuilder: FormBuilder, private rs: RecipeService) {}

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
    this.commentSubmitted = true;

    this.commentError = '';

    if (this.commentForm.invalid) {
      return;
    }

    this.commentLoading = true;

    let comment: IComments = {
      'createdBy': this.user?._id!,
      'createdDate': Date.now().toString(),
      'comment': this.commentForm.controls['comment'].value
    }

    this.rs.postRecipeComment(this.recipe._id, comment).subscribe(
      {
        next: (response) => {
          console.log('comment-section component response: ' + response.title + ' ' + response.comments);

          // NEUES REZEPT MUSS AUCH IM DETAILS COMPONENT GESETZT WERDEN
          // SONST IST DER NEUE KOMMENTAR BEIM SCHLIEßEN UND WIEDER ÖFFNEN
          // DES KOMMENTARBEREICHS NICHT MEHR DA (ERST BEI SEITEN RELOAD)
          this.recipe = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('postRecipeComment() completed')
      }
    )

    this.commentForm.reset();
  }

}
