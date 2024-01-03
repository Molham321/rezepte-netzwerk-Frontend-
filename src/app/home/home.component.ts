import { IRecipe } from '../interfaces/recipe.interface';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes!: IRecipe[];
  latestRecipes!: IRecipe[];
  topLikedRecipes!: IRecipe[];
  recipeOfTheDay!: IRecipe;

  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.recipeService.getAll().subscribe(
      {
        next: (response) => {
          this.recipes = response;

          this.topLikedRecipes = this.recipes.slice().sort((a, b) => {
            return parseInt(b.likes) - parseInt(a.likes);
          }).slice(0, 3);

          this.latestRecipes = this.recipes.sort((a, b) => {
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          }).slice(0, 3);

          this.recipeOfTheDay = this.recipes[Math.floor(Math.random() * this.recipes.length)];

        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }
}

