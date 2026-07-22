import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListItems } from './shopping-list-items';

describe('ShoppingListItems', () => {
  let component: ShoppingListItems;
  let fixture: ComponentFixture<ShoppingListItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListItems],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
