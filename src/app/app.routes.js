import { Chrono } from './Components/chrono/chrono';
import { Directives } from './Components/directives/directives';
export const routes = [
    { path: '', redirectTo: 'chrono', pathMatch: 'full' },
    { path: 'chrono', component: Chrono },
    { path: 'directive', component: Directives },
];
