import { __decorate } from "tslib";
import { Directive, ElementRef, inject } from '@angular/core';
let Exemple = class Exemple {
    el = inject(ElementRef); //obligatoire
    maMethode() {
        console.log('Action de ma méthode');
    }
};
Exemple = __decorate([
    Directive({
        selector: '[appExemple]',
        host: {
            '(click)': 'maMethode()'
        }
        //on ajoute ici les écouteurs d evenement et les actions a réaliser
    })
], Exemple);
export { Exemple };
