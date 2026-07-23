import { Service, signal } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  quantity: number;
}

@Service()
export class ShoppingListService {
  private readonly _itemsSignal = signal<Item[]>([]);

  readonly items = this._itemsSignal.asReadonly();

  addItem(name: string, quantity: number = 1): void {
    const trimmedName = name.trim();
    if (!trimmedName || quantity <= 0) return;

    this._itemsSignal.update((list) => {
      const existing = list.find(
        (item) => item.name.toLowerCase() === trimmedName.toLowerCase(),
      );

      if (existing) {
        return list.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...list, { id: Date.now(), name: trimmedName, quantity }];
    });
  }

  removeItem(id: number): void {
    this._itemsSignal.update((list) => list.filter((item) => item.id !== id));
  }

  incrementQuantity(id: number): void {
    this._itemsSignal.update((list) =>
      list.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  decrementQuantity(id: number): void {
    this._itemsSignal.update((list) =>
      list
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  setQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }

    this._itemsSignal.update((list) =>
      list.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  clear(): void {
    this._itemsSignal.set([]);
  }
}