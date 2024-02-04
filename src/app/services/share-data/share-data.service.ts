import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IRecipe } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private updatedRecipe = new ReplaySubject<IRecipe>();
  getUpdatedRecipe = this.updatedRecipe.asObservable();

  constructor() { }

  setUpdatedRecipe(recipe: IRecipe): void {
    this.updatedRecipe.next(recipe);
  }
}
