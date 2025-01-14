import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';
import { RecipeService, UserService } from 'src/app/services';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user')!);
  userRecipes: IRecipe[] = [];
  savedRecipes: IRecipe[] = [];
  showForm: Boolean = false;

  error: boolean = false;

  userForm!: FormGroup;
  userLoading = false;
  userSubmitted = false;
  userError?: string;
  userHide = true;

  passwordForm!: FormGroup;
  passwordLoading = false;
  passwordSubmitted = false;
  passwordError?: string;
  passwordHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private recipeService: RecipeService,
    private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.user);
    this.readRecipes(this.user._id);
    this.readSavedRecipes(this.user._id);

    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });

    this.userForm.setValue({
      username: this.user.username
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, this.customPasswordValidator]],
      passwordRepeat: ['', [Validators.required]]
    });
  }

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(control.value) ? null : { invalidPassword: true };
  }

  onUsernameSubmit() {
    this.userSubmitted = true;
    this.userError = '';

    if (this.userForm.invalid) {
      return;
    }

    this.userLoading = true;

    this.userService.updateUserById(this.user._id, this.userForm.controls['username'].value).subscribe(
      {
        next: (response) => {
          console.log('user update component response: ' + response.username);
          localStorage.setItem('user', JSON.stringify(response));
          this.user = JSON.parse(localStorage.getItem('user')!);
          console.log(this.user);
        },
        error: (err) => console.log(err),
        complete: () => console.log('updateUser() completed')

      }
    )
    // alert(this.userForm.controls['username'].value);
    this.showSnackbar("Nutzername wurde erfolgreich geändert.");

  }

  onPasswordSubmit() {

    if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['passwordRepeat'].value, undefined, undefined) {
      this.error = true;
      this.passwordForm.reset();
      return;
    }

    this.passwordSubmitted = true;

    this.passwordError = '';

    if (this.passwordForm.invalid) {
      return;
    }

    this.passwordLoading = true;

    this.userService.updateUserById(this.user._id, undefined, undefined, this.passwordForm.controls['password'].value).subscribe(
      {
        next: (response) => {
          console.log('user update component response: ' + response);
          localStorage.setItem('user', JSON.stringify(response));
          this.user = JSON.parse(localStorage.getItem('user')!);
          console.log(this.user);
        },
        error: (err) => console.log(err),
        complete: () => console.log('updateUser() completed')

      }
    )

    this.error = false;
    this.passwordForm.reset();

    this.showSnackbar("Passwort wurde erfolgreich geändert.");
  }

  readRecipes(ownerId: string): void {
    this.recipeService.getRecipesByOwner(ownerId).subscribe(
      {
        next: (response) => {
          this.userRecipes = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getByOwner() completed')
      })
  }

  readSavedRecipes(userId: string): void {
    this.recipeService.getUserSavedRecipes(userId).subscribe(
      {
        next: (response) => {
          this.savedRecipes = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getSavedRecipes() completed')
      }
    )
  }

  showSnackbar(snackbarMessage: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: snackbarMessage,
      duration: 3000
    })
  }
}
