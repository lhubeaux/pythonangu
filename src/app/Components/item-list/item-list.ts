import { Component, input, output } from '@angular/core';
import { Item } from '../../Services/shopping-list';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-item-list',
  imports: [ButtonModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})

export class ItemList {
  items = input.required<Item[]>();
  itemRemoved = output<number>();
  quantityIncreased = output<number>();
  quantityDecreased = output<number>();

  remove(id: number): void {
    this.itemRemoved.emit(id);
  }

  increase(id: number): void {
    this.quantityIncreased.emit(id);
  }

  decrease(id: number): void {
    this.quantityDecreased.emit(id);
  }
}