import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appExemple]',
  host: {
    '(click)': 'maMethode()'   
  }
  //on ajoute ici les écouteurs d evenement et les actions a réaliser
})
export class Exemple {
  private el = inject(ElementRef) //obligatoire
  maMethode():void{
    console.log('Action de ma méthode')
  }
}
