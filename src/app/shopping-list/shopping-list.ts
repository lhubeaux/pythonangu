import { Component, signal } from '@angular/core';
import { ShoppingListForm } from './shopping-list-form/shopping-list-form';
import { ShoppingListItems } from './shopping-list-items/shopping-list-items';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingListForm, ShoppingListItems],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList {
  items = signal<string[]>([]);

  addItem(item: string): void {
    this.items.update((list) => [...list, item]);
  }

  removeItem(index: number): void {
    this.items.update((list) => list.filter((_, i) => i !== index));
  }
}
