import { IRecipe } from './../../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl = 'http://localhost:8080/recipes/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl);
  }

  getRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(this.baseUrl + id);
  }

  getRecipeByCategory(category: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "category/" + category);
  }

  createNewRecipe(recipeData: IRecipe): Observable<IRecipe> {
    console.log(recipeData);
    return this.http.post<IRecipe>(this.baseUrl + "create", recipeData);
    // .pipe(
    //   map(response => {
    //     console.log("Create Recipe Response:", response);
    //     return response;
    //   }),
    //   catchError(error => {
    //     console.error("Create Recipe Error:", error);

    //     let errorMessage = 'An error occurred during recipe creation.';

    //     if (error) {
    //       if (error.status === 409) {
    //         errorMessage = 'Recipe with the same title already exists.';
    //       }
    //     }

    //     // Rethrow the error to propagate it
    //     return throwError(errorMessage);
    //   })
    // );
  }
}
