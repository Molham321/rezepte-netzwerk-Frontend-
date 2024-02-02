import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { IComments } from 'src/app/interfaces/recipe.interface';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: IComments;

  user?: IUser | null;

  commentOwner!: IUser;
  commentDate: string = "";

  constructor(private us: UserService) {}

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
