import { Component, Input, OnInit } from '@angular/core';
import { IRecipe, IUser } from 'src/app/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComments } from 'src/app/interfaces/recipe.interface';
import { RecipeService } from 'src/app/services';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private formBuilder: FormBuilder,
    private rs: RecipeService,
    private sds: ShareDataService,
    private snackbar: MatSnackBar) {
    this.sds.getUpdatedRecipe.subscribe(recipe => this.recipe = recipe);
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.user = null;
    }

    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });

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
          // this.recipe = response;
          this.sds.setUpdatedRecipe(response);
        },
        error: (err) => console.log(err),
        complete: () => console.log('postRecipeComment() completed')
      }
    )

    this.commentForm.reset();

    this.showSnackbar("Kommentar wurde erfolgreich gepostet.")
  }

  showSnackbar(snackbarMessage: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: snackbarMessage,
      duration: 3000
    })
  }

}
