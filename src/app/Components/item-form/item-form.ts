import { Component, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-item-form',
  imports: [ButtonModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm {
  newItem = signal('');
  quantity = signal(1);
  itemAdded = output<{ name: string; quantity: number }>();

  add(): void {
    const name = this.newItem().trim();
    if (!name) return;

    const quantity = this.quantity() > 0 ? this.quantity() : 1;

    this.itemAdded.emit({ name, quantity });
    this.newItem.set('');
    this.quantity.set(1);
  }

  updateQuantity(value: string): void {
    const parsed = parseInt(value, 10);
    this.quantity.set(Number.isNaN(parsed) || parsed < 1 ? 1 : parsed);
  }
}