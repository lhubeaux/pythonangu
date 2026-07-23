import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SLServices } from '../sl-services';

@Component({
  selector: 'app-shopping-list-form',
  imports: [FormsModule],
  templateUrl: './shopping-list-form.html',
  styleUrl: './shopping-list-form.css',
})
export class ShoppingListForm {
  private sl = inject(SLServices);

  newItem = '';
  newQuantity = 1;

  addItem(): void {
    const trimmed = this.newItem.trim();
    if (!trimmed) return;
    this.sl.addItem(trimmed, this.newQuantity);
    this.newItem = '';
    this.newQuantity = 1;
  }
}
