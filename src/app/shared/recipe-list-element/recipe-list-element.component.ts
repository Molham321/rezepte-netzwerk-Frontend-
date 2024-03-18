import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';

@Component({
  selector: 'app-recipe-list-element',
  templateUrl: './recipe-list-element.component.html',
  styleUrls: ['./recipe-list-element.component.scss']
})
export class RecipeListElementComponent implements OnChanges {

  @Input() recipe!: IRecipe;
  recipeDate: string = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipe'] && changes['recipe'].currentValue) {
      this.recipeDate = new Date(this.recipe.createdDate).toLocaleDateString('de-DE');
    }
  }

}
