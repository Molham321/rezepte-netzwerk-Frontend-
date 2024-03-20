import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services';
import { IRecipe } from 'src/app/interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  currentCategory: string = 'Alle'
  recipes: IRecipe[] = [];
  sortedRecipes: IRecipe[] = [];
  sortedByRating: boolean = false;
  sortedByAlphabet: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentCategory = params['catName'];
      this.readRecipes(this.currentCategory);
    })
  }

  readRecipes(category: string): void {
    const recipeObservable = category === 'Alle' ?
      this.recipeService.getAll() :
      this.recipeService.getRecipeByCategory(category);

    recipeObservable.subscribe({
      next: (response) => {
        this.recipes = response;
        this.sortedRecipes = [...this.recipes];
      }
    })
  }

  sortByRating(): void {
    this.sortedRecipes.sort((a, b) => {
      return this.sortedByRating ? a.likedBy.length - b.likedBy.length : b.likedBy.length - a.likedBy.length;
    });

    this.sortedByRating = !this.sortedByRating;
  }

  sortByAlphabet(): void {
    this.sortedRecipes.sort((a, b) => {
      return this.sortedByAlphabet ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
    });

    this.sortedByAlphabet = !this.sortedByAlphabet;
  }
}
