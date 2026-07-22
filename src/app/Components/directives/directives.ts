import { Component, signal } from '@angular/core';
import { PriorityColor } from '../../directives/priority-color';

@Component({
  selector: 'app-directives',
  imports: [PriorityColor],
  templateUrl: './directives.html',
  styleUrl: './directives.css',
})
export class Directives {
    tasks = signal([
    { title: 'Corriger le bug du chrono', priority: 'high' },
    { title: 'Écrire la doc des pipes', priority: 'medium' },
    { title: 'Nettoyer le CSS', priority: 'low' },
  ]);
}
