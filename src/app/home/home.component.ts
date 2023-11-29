import { IRecipe } from '../interfaces/recipe.interface';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes!: IRecipe[];

  constructor(private ds: DataService) { }
  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.ds.getAll().subscribe(
      {
        next: (response) => {
          this.recipes = response;
          console.log(this.recipes);
          return this.recipes;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

}

