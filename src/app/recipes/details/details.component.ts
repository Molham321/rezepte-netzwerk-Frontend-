import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IRecipe, IUser } from 'src/app/interfaces';
import { DataService, UserService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  // user = JSON.parse(localStorage.getItem('user')!);
  user?: IUser | null;

  currentRecipeId: string = "";
  currentRecipe!: IRecipe;
  recipeDate: string = "";
  recipeOwner!: IUser;

  displayedColumns: string[] = ['amount', 'unit', 'ingredient'];

  constructor(private route: ActivatedRoute, private ds: DataService, private us: UserService, private authenticationService: AuthenticationService,) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentRecipeId = params['id']
    })
    this.ReadRecipe(this.currentRecipeId);
    // this.GetRecipeOwner(this.currentRecipe.createdBy);
  }

  ReadRecipe(id: string): void {
    this.ds.getRecipeById(id).subscribe(
      {
        next: (response) => {
          this.currentRecipe = response;
          console.log(this.currentRecipe);
          this.recipeDate = new Date(this.currentRecipe.createdDate).toLocaleDateString('de-DE');
          this.GetRecipeOwner(this.currentRecipe.createdBy);
          return this.currentRecipe;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      }
    )
  }

  GetRecipeOwner(ownerId: string): void {
    this.us.getUserById(ownerId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.recipeOwner = response;
          return this.recipeOwner;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getUser() completed')
      }
    )
  }

  CheckIfRecipeOwner(): boolean {
    var isRecipeOwner = false;

    if(this.user && this.user?._id === this.currentRecipe.createdBy) {
      isRecipeOwner = true;
    }

    return isRecipeOwner;
  }
}
