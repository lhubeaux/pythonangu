import { Routes } from '@angular/router';
import { Chrono } from './Components/chrono/chrono';
import { Directives } from './Components/directives/directives';
import { ShoppingList } from './shopping-list/shopping-list';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';


export const routes: Routes = [
    { path: '', redirectTo: 'chrono', pathMatch: 'full' },
    { path: 'chrono', component: Chrono },
    { path: 'directive', component: Directives },
    { path: 'shopping-list', component: ShoppingList },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },

];
