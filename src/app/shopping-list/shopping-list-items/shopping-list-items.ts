import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-list-items',
  imports: [],
  templateUrl: './shopping-list-items.html',
  styleUrl: './shopping-list-items.css',
})
export class ShoppingListItems {
  @Input() items: string[] = [];
  @Output() itemRemoved = new EventEmitter<number>();

  remove(index: number): void {
    this.itemRemoved.emit(index);
  }
}
