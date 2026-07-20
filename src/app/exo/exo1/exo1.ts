import { NONE_TYPE } from '@angular/compiler';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-exo1',
  imports: [FormsModule],
  templateUrl: './exo1.html',
  styleUrl: './exo1.scss',
})
export class Exo1 {
  result: WritableSignal<number> = signal(0);
  inputNumber: number = 0;
  resetEnable: WritableSignal<boolean> = signal(false);

  resetCalc(): void {
    this.result.set(0);
    this.resetEnable.set(false);
  }

  addInput(): void {
    this.result.set(this.result() + this.inputNumber!);
    this.inputNumber = 0;
    if (this.result() > 0) {
      this.resetEnable.set(true);
    }
  }
}
