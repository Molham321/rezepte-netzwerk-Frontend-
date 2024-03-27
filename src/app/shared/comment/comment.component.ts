import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { IComments } from 'src/app/interfaces/recipe.interface';
import { RecipeService, UserService } from 'src/app/services';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: IComments;
  @Input() recipeId!: string;
  @Input() commentIndex!: number;

  user?: IUser | null;

  commentOwner!: IUser;
  commentDate: string = "";

  constructor(
    private us: UserService, 
    private rs: RecipeService, 
    private sds: ShareDataService, 
    private snackbar: MatSnackBar,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    } else {
      this.user = null;
    }

    this.GetCommentOwner(this.comment.createdBy);
    this.commentDate = new Date(this.comment.createdDate).toLocaleDateString('de-DE');
  }

  GetCommentOwner(ownerId: string): void {
    this.us.getUserById(ownerId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.commentOwner = response;
          return this.commentOwner;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getUser() completed')
      }
    )
  }

  DeleteOwnComment(recipeId: string, commentIndex: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {title: "Kommentar löschen", message: "Möchten Sie den Kommentar wirklich löschen?"},
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rs.deleteRecipeComment(recipeId, commentIndex).subscribe(
          {
            next: (response) => {
              console.log('comment component response: ' + response.title + ' ' + response.comments);
    
              // NEUES REZEPT MUSS AUCH IM DETAILS COMPONENT UND COMMENT-SECTION COMPONENT GESETZT WERDEN
              // this.recipe = response;
              this.sds.setUpdatedRecipe(response);
            },
            error: (err) => console.log(err),
            complete: () => console.log('deleteOwnComment() completed')
          }
        )

        this.showSnackbar("Kommentar wurde erfolgreich gelöscht.");
      }
    });
  }

  IsCommentOwner(): boolean {
    if(this.user) {
      if(this.user._id === this.comment.createdBy || this.user.authentication.role === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  showSnackbar(snackbarMessage: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: snackbarMessage,
      duration: 3000
    })
  }
}
