import { Component } from '@angular/core';
import { ShoppingListForm } from './shopping-list-form/shopping-list-form';
import { ShoppingListItems } from './shopping-list-items/shopping-list-items';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingListForm, ShoppingListItems],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
})
export class ShoppingList {}
