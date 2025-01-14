import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './recipes/add/add.component';
import { CategoryComponent } from './recipes/category/category.component';
import { DetailsComponent } from './recipes/details/details.component';
import { AuthGuard } from './guards'
import { SearchResultsComponent } from './shared/search-results/search-results.component';
import { UpdateComponent } from './recipes/update/update.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminViewComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'profile', component: ProfileComponent },
  { path: 'add', component: AddComponent },
  { path: 'category/:catName', component: CategoryComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'search/:searchedRecipe', component: SearchResultsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
