import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DataService } from 'src/app/services';
import { IRecipe } from 'src/app/interfaces';
import { map } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  currentCategory: string = 'Alle'
  recipes!: IRecipe[];

  constructor(private route: ActivatedRoute, private router: Router, private ds: DataService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // this.recipes = [];
      this.currentCategory = params['catName'];
      console.log(this.currentCategory);

      // todo: funktioniert noch nicht!

      // this.readRecipes(params['catName']);
      // console.log(this.recipes);
    })

    this.readRecipes(this.currentCategory);

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.currentCategory = params.get('catName')!;
    // })

    // this.router.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd) {
    //     this.currentCategory = this.route.snapshot.paramMap.get('catName')!;
    //     console.log(this.currentCategory);
    //     this.readRecipes(this.currentCategory);
    //     console.log(this.recipes);  
    //   }
    // })
  }

  readRecipes(category: string): void {

    if(category == "Alle") {
      this.ds.getAll().subscribe(
        {
          next: (response) => {
            this.recipes = response;
            // console.log(this.recipes);
            // return this.recipes;
          },
          error: (err) => console.log(err),
          complete: () => console.log('getAll() completed')
        })
    }
    else {
      this.ds.getRecipeByCategory(category).subscribe(
        {
          next: (response) => {
            this.recipes = response;
            // console.log(this.recipes);
            // return this.recipes;
          },
          error: (err) => console.log(err),
          complete: () => console.log('getByCategory() completed')
        })
    }
  }
}
