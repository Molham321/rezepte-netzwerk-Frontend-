import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { IComments } from 'src/app/interfaces/recipe.interface';
import { RecipeService, UserService } from 'src/app/services';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

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

  constructor(private us: UserService, private rs: RecipeService, private sds: ShareDataService) {}

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
    if(confirm("Möchtest du diesen Kommentar wirklich löschen?")) {
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
    }
  }

  IsCommentOwner(): boolean {
    if(this.user) {
      if(this.user._id === this.comment.createdBy) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
