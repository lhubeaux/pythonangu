import { Component, inject } from '@angular/core';
import { SLServices } from '../sl-services';

@Component({
  selector: 'app-shopping-list-items',
  imports: [],
  templateUrl: './shopping-list-items.html',
  styleUrl: './shopping-list-items.css',
})
export class ShoppingListItems {
  private sl = inject(SLServices);
  items = this.sl.items;

  remove(index: number): void {
    this.sl.removeItem(index);
  }
}
