import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-item-form',
  imports: [],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm {
  newItem = signal('');
  itemAdded = output<string>();

  add(): void {
    const value = this.newItem().trim();
    if (!value) return;

    this.itemAdded.emit(value);
    this.newItem.set('');
  }
}