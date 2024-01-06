import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchString: string = "";
  allRecipes!: IRecipe[];
  filteredRecipes!: IRecipe[];

  constructor(private route: ActivatedRoute, private router: Router, private ds: DataService) {

  }

  ngOnInit(): void {
    this.getAllRecipes();

    this.route.params.subscribe((params) => {
      this.searchString = params['searchedRecipe'];
      this.filterRecipes(this.searchString);
    })
  }

  getAllRecipes(): void {
    this.ds.getAll().subscribe(
      {
        next: (response) => {
          this.allRecipes = response;
          // console.log(this.allRecipes);
          this.filterRecipes(this.searchString);
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  filterRecipes(searchString: String): void {
    // console.log(searchString);
    this.filteredRecipes = [];
    this.allRecipes.forEach(element => {
      // console.log(element.title);
      if(element.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())) {
        // console.log(element.title);
        this.filteredRecipes.push(element);
      }
    });
  }
}
