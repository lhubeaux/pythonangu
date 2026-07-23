import { Component, inject } from '@angular/core';
import { ItemForm } from '../item-form/item-form';
import { ItemList } from '../item-list/item-list';
import { ShoppingListService } from '../../Services/shopping-list';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-shopping-list',
  imports: [ItemForm, ItemList, CardModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList {
  private readonly _shoppingListService = inject(ShoppingListService);

  items = this._shoppingListService.items;

  addItem(event: { name: string; quantity: number }): void {
    this._shoppingListService.addItem(event.name, event.quantity);
  }

  removeItem(id: number): void {
    this._shoppingListService.removeItem(id);
  }

  increaseQuantity(id: number): void {
    this._shoppingListService.incrementQuantity(id);
  }

  decreaseQuantity(id: number): void {
    this._shoppingListService.decrementQuantity(id);
  }
}