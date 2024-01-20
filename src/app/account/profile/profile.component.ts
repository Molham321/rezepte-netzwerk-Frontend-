import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';
import { DataService, RecipeService, UserService } from 'src/app/services';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user')!);
  userRecipes!: IRecipe[];
  savedRecipes!: IRecipe[];
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

  constructor(private formBuilder: FormBuilder, private ds: DataService, private us: UserService, private rs: RecipeService) {}

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

    // reset alert on submit
    this.userError = '';

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.userLoading = true;

    this.us.updateUserById(this.user._id, this.userForm.controls['username'].value).subscribe(
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
  }

  onPasswordSubmit() {

    if(this.passwordForm.controls['password'].value !== this.passwordForm.controls['passwordRepeat'].value, undefined, undefined) {
      this.error = true;
      this.passwordForm.reset();
      return;
    }

    this.passwordSubmitted = true;

    // reset alert on submit
    this.passwordError = '';

    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }

    this.passwordLoading = true;

    this.us.updateUserById(this.user._id, undefined, undefined, this.passwordForm.controls['password'].value).subscribe(
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
    
    // alert(this.passwordForm.controls['password'].value + " - " + this.passwordForm.controls['passwordRepeat'].value);
    this.error  = false;
    this.passwordForm.reset();
  }

  readRecipes(ownerId: string): void {
      this.ds.getRecipesByOwner(ownerId).subscribe(
        {
          next: (response) => {
            this.userRecipes = response;
            // console.log(this.recipes);
            // return this.recipes;
          },
          error: (err) => console.log(err),
          complete: () => console.log('getByOwner() completed')
        })
  }

  readSavedRecipes(userId: string): void {
    this.rs.getUserSavedRecipes(userId).subscribe(
      {
        next: (response) => {
          this.savedRecipes = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getSavedRecipes() completed')
      }
    )
  }
}
