import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  recipeCategories: string[] = ['alle Rezepte', 'Italienisch', 'Vegetarisch', 'Suppen', 'Salate', 'Japanisch', 'Indisch', 'Vegan']

  submenuVisible: boolean = false;
  user?: IUser | null;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  showSubmenu(): void {
    this.submenuVisible = !this.submenuVisible;
  }
  logout() {
    this.authenticationService.logout();
  }
}
