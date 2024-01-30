import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  recipeCategories: string[] = ['Alle', 'Italienisch', 'Vegetarisch', 'Suppen', 'Salate', 'Japanisch', 'Indisch', 'Vegan']

  submenuVisible: boolean = false;
  user?: IUser | null;

  searchForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      recipe: new FormControl('', Validators.required)
    });
  }

  showSubmenu(): void {
    this.submenuVisible = !this.submenuVisible;
  }

  logout() {
    this.authenticationService.logout();
  }

  searchRecipes(): void {
    // alert(this.searchForm.controls['recipe'].value);
    this.router.navigate(['search/' + this.searchForm.controls['recipe'].value]);
    this.searchForm.reset();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const header = document.querySelector('header');
    if (header) {
      header.classList.toggle("sticky", window.scrollY > 0);
    }
  }

  toggleMenu() {
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    if (menuToggle && navigation) {
      menuToggle.classList.toggle('active');
      navigation.classList.toggle('active');
    }
  }


}
