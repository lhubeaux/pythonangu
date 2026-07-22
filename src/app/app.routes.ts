import { Routes } from '@angular/router';
import { Chrono } from './Components/chrono/chrono';


export const routes: Routes = [
    { path: '', redirectTo: 'chrono', pathMatch: 'full' },
    { path: 'chrono', component: Chrono },
    // { path: '', component:  },
];
