import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {
  items = input.required<{ id: number; name: string }[]>();
  itemRemoved = output<number>();

  remove(id: number): void {
    this.itemRemoved.emit(id);
  }
}