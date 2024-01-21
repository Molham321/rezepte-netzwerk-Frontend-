import { IRecipe } from './../../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl = 'http://localhost:8080/recipes/'

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getAll(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl);
  }

  getRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(this.baseUrl + id);
  }

  getRecipeByCategory(category: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "category/" + category);
  }

  createNewRecipe(
    title: string,
    description: string,
    imageURL: string,
    servings: number,
    prepTime: number,
    ingredientsAmount: string,
    ingredientsUnit: string,
    ingredientsIngredient: string,
    stepsOrder: number,
    stepsDescription: string,
    category: string[]
  ): Observable<IRecipe> {

    // Benutzer aus dem AuthenticationService holen
    const user = this.authenticationService.userValue;

    const createdBy = user?._id

    const recipesData = {
      title,
      description,
      imageURL,
      servings,
      prepTime,
      ingredients: [{
        amount: ingredientsAmount,
        unit: ingredientsUnit,
        ingredient: ingredientsIngredient
      }],
      steps: [{
        order: stepsOrder,
        description: stepsDescription
      }],
      category,
      createdBy
    };

    return this.http.post<IRecipe>(`${this.baseUrl}create`, recipesData)
      .pipe(
        map(response => {
          console.log('Create Recipe Response:', response);
          return response;
        }),
        catchError(error => {
          console.error('Create Recipe Error:', error);

          let errorMessage = 'An error occurred during recipe creation.';

          if (error) {
            if (error.status === 409) {
              errorMessage = 'Recipe with the same title already exists.';
            }
          }

          return throwError(errorMessage);
        })
      );
  }

  updateRecipeLikeCount(recipeId: string, likedBy: string[]): Observable<IRecipe> {

    console.log('from recipe service: ' + recipeId + ' ' + likedBy);

    const recipeData = {
      likedBy
    };

    return this.http.post<IRecipe>(this.baseUrl + "like/" + recipeId, recipeData)
      .pipe(
        map(response => {
          console.log('update like count response: ', response);
          return response;
        }),
        catchError(error => {
          console.error('update like count error: ', error);

          let errorMessage = 'An error occured during like count update';

          return throwError(errorMessage);
        })
      )
  }

  updateRecipeSaves(recipeId: string, savedBy: string[]): Observable<IRecipe> {

    const recipeData = {
      savedBy
    };

    return this.http.post<IRecipe>(this.baseUrl + "save/" + recipeId, recipeData)
      .pipe(
        map(response => {
          console.log('save recipe response: ', response);
          return response;
        }),
        catchError(error => {
          console.error('save recipe error: ', error);

          let errorMessage = 'An error occured during recipe save update';

          return throwError(errorMessage);
        })
      )
  }

  getUserSavedRecipes(userId: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "saved/" + userId);
  }
}
