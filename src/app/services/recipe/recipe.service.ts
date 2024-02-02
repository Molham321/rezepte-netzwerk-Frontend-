import { IRecipe } from './../../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { IComments } from 'src/app/interfaces/recipe.interface';

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

  deleteRecipe(id: string) {
    return this.http.delete<IRecipe>(this.baseUrl + id)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Delete Recipe Error:', error);

          let errorMessage = 'An error occurred during recipe deleting.';
          return throwError(errorMessage);
        })
      );
  }

  createNewRecipe(
    title: string,
    description: string,
    imageURL: string,
    servings: number,
    prepTime: number,
    ingredients: { amount: string, unit: string, ingredient: string }[],
    steps: { order: number, description: string }[],
    category: string[]
  ): Observable<IRecipe> {

    const user = this.authenticationService.userValue;
    const createdBy = user?._id

    const recipesData = {
      title,
      description,
      imageURL,
      servings,
      prepTime,
      ingredients,
      steps,
      category,
      createdBy
    };

    return this.http.post<IRecipe>(`${this.baseUrl}create`, recipesData)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Create Recipe Error:', error);

          let errorMessage = 'An error occurred during recipe creation.';
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

  postRecipeComment(recipeId: string, comment: IComments): Observable<IRecipe> {
    const recipeData = {
      comment
    };

    return this.http.post<IRecipe>(this.baseUrl + "comments/create/" + recipeId, recipeData)
      .pipe(
        map(response => {
          console.log('post comment response: ', response);
          return response;
        }),
        catchError(error => {
          console.error('post comment error: ', error);

          let errorMessage = 'An error occured during comment post';

          return throwError(errorMessage);
        })
      )
  }
}