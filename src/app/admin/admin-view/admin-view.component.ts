import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IRecipe, IUser } from 'src/app/interfaces';
import { RecipeService, UserService } from 'src/app/services';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminViewComponent implements OnInit {
  users: IUser[] = [];
  columnsToDisplay = ['_id', 'username', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: IUser | null = null;

  userRecipes: IRecipe[] = [];

  constructor(
    private userService: UserService,
    private recipeService: RecipeService
  ) {

  }

  ngOnInit(): void {
    this.readUsers();
  }

  readUsers(): void {
    this.userService.getAll().subscribe(
      {
        next: (response) => {
          this.users = response;
          this.users.sort((a, b) => {
            return a.email.localeCompare(b.email);
          })
          // this.expandedElement = this.users[0];
          console.log(this.users);
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      }
    )
  }

  readUserRecipes(ownerId: string): void {
    this.recipeService.getRecipesByOwner(ownerId).subscribe(
      {
        next: (response) => {
          this.userRecipes = response;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getByOwner() completed')
      })
  }

  setExpandedElement(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.readUserRecipes(element._id);
    console.log(element);
    console.log(this.expandedElement);
  }
}
