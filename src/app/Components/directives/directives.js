import { __decorate } from "tslib";
import { Component, signal } from '@angular/core';
import { PriorityColor } from '../../directives/priority-color';
let Directives = class Directives {
    tasks = signal([
        { title: 'Corriger le bug du chrono', priority: 'high' },
        { title: 'Écrire la doc des pipes', priority: 'medium' },
        { title: 'Nettoyer le CSS', priority: 'low' },
    ]);
};
Directives = __decorate([
    Component({
        selector: 'app-directives',
        imports: [PriorityColor],
        templateUrl: './directives.html',
        styleUrl: './directives.css',
    })
], Directives);
export { Directives };
