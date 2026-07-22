import { Component, signal } from '@angular/core';
import { ItemForm } from '../../item-form/item-form';
import { ItemList } from '../../item-list/item-list';


@Component({
  selector: 'app-shopping-list',
  imports: [ItemForm, ItemList],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList {
  items = signal<{ id: number; name: string }[]>([]);

  addItem(name: string): void {
    this.items.update((list) => [...list, { id: Date.now(), name }]);
  }

  removeItem(id: number): void {
    this.items.update((list) => list.filter((item) => item.id !== id));
  }
}