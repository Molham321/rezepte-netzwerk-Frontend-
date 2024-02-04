import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IRecipe, IUser } from 'src/app/interfaces';
import { DataService, UserService, AuthenticationService, RecipeService } from 'src/app/services';
import { first } from 'rxjs';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user?: IUser | null;

  currentRecipeId: string = "";
  currentRecipe!: IRecipe;
  recipeDate: string = "";
  recipeOwner!: IUser;

  displayedColumns: string[] = ['amount', 'unit', 'ingredient'];

  loading = false;
  submitted = false;
  error?: string;

  showComments: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private ds: DataService,
    private us: UserService,
    private rs: RecipeService,
    private authenticationService: AuthenticationService,
    private sds: ShareDataService
  ) {
        this.authenticationService.user.subscribe(x => this.user = x);
        this.sds.getUpdatedRecipe.subscribe(recipe => this.currentRecipe = recipe);
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

    if (this.user && this.user?._id === this.currentRecipe.createdBy) {
      isRecipeOwner = true;
    }

    return isRecipeOwner;
  }

  deleteRecipe() {
    this.rs.deleteRecipe(this.currentRecipeId)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: errorMessage => {
          this.error = errorMessage;
          this.loading = false;
        }
      });
  }

  UpdateRecipeLikeCount(recipeId: string, likingUser: string): void {
    let recipeLikes = this.currentRecipe.likedBy;

    if(recipeLikes.includes(likingUser)) {
      recipeLikes.forEach((item, index) => {
        if(item === likingUser) recipeLikes.splice(index, 1);
      });
    } else {
      recipeLikes.push(likingUser);
    }

    console.log(recipeLikes);

    this.rs.updateRecipeLikeCount(recipeId, recipeLikes).subscribe(
      {
        next: (response) => {
          console.log('details component response: ' + response.title + ' ' + response.likedBy);
          // this.currentRecipe = response;
          // return this.currentRecipe;
        },
        error: (err) => console.log(err),
        complete: () => console.log('updateRecipeLikeCount() completed')

        }
    )
  }

  SaveRecipe(recipeId: string, savingUser: string): void {
    let recipeSaves = this.currentRecipe.savedBy;

    if(recipeSaves.includes(savingUser)) {
      recipeSaves.forEach((item, index) => {
        if(item === savingUser) recipeSaves.splice(index, 1);
      });
    } else {
      recipeSaves.push(savingUser);
    }

    console.log(recipeSaves);

    this.rs.updateRecipeSaves(recipeId, recipeSaves).subscribe(
      {
        next: (response) => {
          console.log('details component response: ' + response.title + ' ' + response.savedBy);
        },
        error: (err) => console.log(err),
        complete: () => console.log('saveRecipe() completed')
      }
    )
  }
}
