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
}
