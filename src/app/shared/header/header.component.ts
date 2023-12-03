import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  recipeCategories: string[] = ['alle Rezepte', 'Italienisch', 'Vegetarisch', 'Suppen', 'Salate', 'Japanisch', 'Indisch', 'Vegan']

  submenuVisible: boolean = false;

  showSubmenu(): void {
    this.submenuVisible = !this.submenuVisible;
  }
}
