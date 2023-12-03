import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IRecipe } from 'src/app/interfaces';
import { DataService } from 'src/app/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currentRecipeId: string = "";
  currentRecipe!: IRecipe;
  constructor(private route: ActivatedRoute, private ds: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentRecipeId = params['id']
    })
    this.ReadRecipe(this.currentRecipeId);
  }

  ReadRecipe(id: string): void {
    this.ds.getRecipeById(id).subscribe(
      {
        next: (response) => {
          this.currentRecipe = response;
          console.log(this.currentRecipe);
          return this.currentRecipe;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      }
    )
  }
}
