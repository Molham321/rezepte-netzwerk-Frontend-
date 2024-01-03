import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';
import { DataService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private ds: DataService) {}

  ngOnInit(): void {
    console.log(this.user);
    this.readRecipes(this.user._id);
    this.savedRecipes = [];

    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });

    this.userForm.setValue({
      username: this.user.username
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]]
    });
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
    alert(this.userForm.controls['username'].value);
  }

  onPasswordSubmit() {
    this.passwordSubmitted = true;

    // reset alert on submit
    this.passwordError = '';

    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }

    this.passwordLoading = true;
    if(this.passwordForm.controls['password'].value === this.passwordForm.controls['passwordRepeat'].value) {
      alert(this.passwordForm.controls['password'].value + " - " + this.passwordForm.controls['passwordRepeat'].value);
      this.passwordForm.reset();
    }
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
}
