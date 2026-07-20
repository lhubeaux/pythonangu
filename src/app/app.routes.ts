import { Routes } from '@angular/router';
import { Main as DemoMain } from './demo/main/main';
import { Main as ExoMain } from './exo/main/main';
import { Exo1 } from './exo/exo1/exo1';

export const routes: Routes = [
  { path: 'demo', component: DemoMain },
  {
    path: 'exo',
    component: ExoMain,
    children: [{ path: 'exo1', component: Exo1 }],
  },
];
