import { IRecipe } from './../../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // or import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  // z.b:
  // public getUsers() {
  //   return this.http.get<IUser[]>('http://localhost:1377/api/data');
  // }

  // or
  getAll(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "recipes");
  }

  getRecipeById(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(this.baseUrl + "recipes/" + id);
  }

  getRecipeByCategory(category: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "recipes/category/" + category);
  }

  getRecipesByOwner(ownerId: string): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.baseUrl + "owner/" + ownerId);
  }
}
