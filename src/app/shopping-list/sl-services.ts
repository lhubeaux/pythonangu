import { Service, signal } from '@angular/core';

export interface ShoppingItem {
  name: string;
  quantity: number;
}

@Service({})
export class SLServices {
  _items = signal<ShoppingItem[]>([]);
  items = this._items.asReadonly();

  addItem(name: string, quantity: number): void {
    const normalized = name.trim().toLowerCase();

    this._items.update((list) => {
      const existingIndex = list.findIndex(
        (item) => item.name.trim().toLowerCase() === normalized
      );

      if (existingIndex !== -1) {
        return list.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...list, { name: name.trim(), quantity }];
    });
  }

  removeItem(index: number): void {
    this._items.update((list) => list.filter((_, i) => i !== index));
  }
}
