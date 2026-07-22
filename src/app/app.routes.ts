import { Routes } from '@angular/router';
import { Chrono } from './Components/chrono/chrono';
import { Directives } from './Components/directives/directives';


export const routes: Routes = [
    { path: '', redirectTo: 'chrono', pathMatch: 'full' },
    { path: 'chrono', component: Chrono },
    { path: 'directive', component: Directives },
];
