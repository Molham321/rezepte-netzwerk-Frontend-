import { IRecipe } from '../interfaces/recipe.interface';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services';
import { NavigationEnd, Router } from '@angular/router';

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

  constructor(private recipeService: RecipeService, private router: Router) { }
  ngOnInit(): void {
    this.readAll();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
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

