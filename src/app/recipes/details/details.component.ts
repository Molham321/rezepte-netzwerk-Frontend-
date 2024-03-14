import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe, IUser } from 'src/app/interfaces';
import { DataService, UserService, AuthenticationService, RecipeService } from 'src/app/services';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ShareDataService } from 'src/app/services/share-data/share-data.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  quantityCounter = 1;

  showComments: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ds: DataService,
    private us: UserService,
    private rs: RecipeService,
    private authenticationService: AuthenticationService,
    private sds: ShareDataService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.sds.getUpdatedRecipe.subscribe(recipe => this.currentRecipe = recipe);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentRecipeId = params['id']
    })
    this.ReadRecipe(this.currentRecipeId);
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

    this.showSnackbar("Rezept wurde erfolgreich gelöscht.");
  }

  UpdateRecipeLikeCount(recipeId: string, likingUser: string): void {
    let recipeLikes = this.currentRecipe.likedBy;

    if (recipeLikes.includes(likingUser)) {
      recipeLikes.forEach((item, index) => {
        if (item === likingUser) recipeLikes.splice(index, 1);

        this.showSnackbar("Stern wurde erfolgreich vom Rezept entfernt.")
      });
    } else {
      recipeLikes.push(likingUser);

      this.showSnackbar("Stern wurde erfolgreich an das Rezept vergeben.")
    }

    console.log(recipeLikes);

    this.rs.updateRecipeLikeCount(recipeId, recipeLikes).subscribe(
      {
        next: (response) => {
          console.log('details component response: ' + response.title + ' ' + response.likedBy);
        },
        error: (err) => console.log(err),
        complete: () => console.log('updateRecipeLikeCount() completed')

      }
    )
  }

  SaveRecipe(recipeId: string, savingUser: string): void {
    let recipeSaves = this.currentRecipe.savedBy;

    if (recipeSaves.includes(savingUser)) {
      recipeSaves.forEach((item, index) => {
        if (item === savingUser) recipeSaves.splice(index, 1);

        this.showSnackbar("Rezept wurde erfolgreich aus der Merkliste entfernt.");
      });
    } else {
      recipeSaves.push(savingUser);

      this.showSnackbar("Rezept wurde erfolgreich in der Merkliste gespeichert.");
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

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {title: "Rezept löschen", message: "Möchten Sie das Rezept wirklich löschen?"},
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe();
      }
    });
  }

  printDetails() {
    window.print();
  }

  adjustAllQuantities(action: string): void {

    let quantityCounter: number = this.quantityCounter;
    let servings = this.currentRecipe.servings

    this.currentRecipe.ingredients.forEach((ingredient: any) => {
      if (action === 'increase') {

        ingredient.amount = ingredient.amount + (ingredient.amount / servings);
        this.quantityCounter = quantityCounter + 1;

      } else if (action === 'decrease' && quantityCounter > 1) {
        ingredient.amount = ingredient.amount - (ingredient.amount / servings);
        this.quantityCounter = quantityCounter - 1;
      }
    });

    this.currentRecipe.servings = this.quantityCounter
    this.cdr.detectChanges();
  }

  showSnackbar(snackbarMessage: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: snackbarMessage,
      duration: 3000
    })
  }

}
