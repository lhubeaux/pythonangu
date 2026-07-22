import { Routes } from '@angular/router';
import { Chrono } from './Components/chrono/chrono';
import { Directives } from './Components/directives/directives';
import { ShoppingList } from './Components/shopping-list/shopping-list';

export const routes: Routes = [
  { path: '', redirectTo: 'chrono', pathMatch: 'full' },
  { path: 'chrono', component: Chrono },
  { path: 'directive', component: Directives },
  { path: 'shopping-list', component: ShoppingList },
];