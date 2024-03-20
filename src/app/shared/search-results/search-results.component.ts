import { RecipeService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchString: string = "";
  allRecipes!: IRecipe[];
  filteredRecipes!: IRecipe[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.GetAllRecipes();

    this.route.params.subscribe((params) => {
      this.searchString = params['searchedRecipe'];
      this.FilterRecipes(this.searchString);
    })
  }

  GetAllRecipes(): void {
    this.recipeService.getAll().subscribe(
      {
        next: (response) => {
          this.allRecipes = response;
          this.FilterRecipes(this.searchString);
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  FilterRecipes(searchString: string): void {
    this.filteredRecipes = [];
    this.allRecipes.forEach(element => {
      if (
        element.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
        element.description.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
      ) {
        this.filteredRecipes.push(element);
      } else {
        const matchingIngredients = element.ingredients.filter(ingredient =>
          ingredient.ingredient.toLowerCase().includes(searchString.toLowerCase())
        );
        if (matchingIngredients.length > 0) {
          this.filteredRecipes.push(element);
        }
      }
    });
  }
}
