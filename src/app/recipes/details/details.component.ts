import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IRecipe, IUser } from 'src/app/interfaces';
import { DataService, UserService, AuthenticationService, RecipeService } from 'src/app/services';
import { first } from 'rxjs';

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

  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private ds: DataService,
    private us: UserService,
    private authenticationService: AuthenticationService,
    private recipeService: RecipeService,
    private router: Router,
  ) {
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

    if (this.user && this.user?._id === this.currentRecipe.createdBy) {
      isRecipeOwner = true;
    }

    return isRecipeOwner;
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.currentRecipeId)
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
}
