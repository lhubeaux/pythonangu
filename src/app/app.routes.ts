import { Routes } from '@angular/router';
import { Chrono } from './Components/chrono/chrono';
import { Pipes } from './Components/pipes/pipes';

export const routes: Routes = [
    { path: '', redirectTo: 'chrono', pathMatch: 'full' },
    { path: 'chrono', component: Chrono },
    { path: 'pipes', component: Pipes },
];
