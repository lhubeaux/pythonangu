import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-form',
  imports: [FormsModule],
  templateUrl: './shopping-list-form.html',
  styleUrl: './shopping-list-form.css',
})
export class ShoppingListForm {
  @Output() itemAdded = new EventEmitter<string>();

  newItem = '';

  addItem(): void {
    const trimmed = this.newItem.trim();
    if (!trimmed) return;
    this.itemAdded.emit(trimmed);
    this.newItem = '';
  }
}
