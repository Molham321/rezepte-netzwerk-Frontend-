import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';

@Component({
  selector: 'app-recipe-list-element',
  templateUrl: './recipe-list-element.component.html',
  styleUrls: ['./recipe-list-element.component.scss']
})
export class RecipeListElementComponent implements OnInit {
  @Input() recipe!: IRecipe;
  recipeDate: string = "";

  ngOnInit(): void {
    this.recipeDate = new Date(this.recipe.createdDate).toLocaleDateString('de-DE');
  }

}
