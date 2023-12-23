import { IRecipe } from './../../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "recipes");
  }

  getRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(this.baseUrl + "recipes/" + id);
  }

  getRecipeByCategory(category: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "recipes/category/" + category);
  }
}
