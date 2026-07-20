import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exo1 } from './exo1';

describe('Exo1', () => {
  let component: Exo1;
  let fixture: ComponentFixture<Exo1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exo1],
    }).compileComponents();

    fixture = TestBed.createComponent(Exo1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
