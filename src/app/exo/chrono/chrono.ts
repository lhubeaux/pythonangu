import { Component, WritableSignal, signal } from '@angular/core';
import { DureePipe } from '../../shared/pipes/duree-pipe';

@Component({
  selector: 'app-chrono',
  imports: [DureePipe],
  templateUrl: './chrono.html',
  styleUrl: './chrono.scss',
})
export class Chrono {

  time: WritableSignal<number> = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  isRunning = signal(false)

  resetChrono(): void {
    this.time.set(0);
  }

  startChrono(): void {
    if (this.intervalId !== null) return; // déjà en marche

    this.intervalId = setInterval(() => {
      this.time.update(t => t + 1);
    }, 1000);
  }

  pauseChrono(): void{
  if (this.intervalId === null) return; // déjà en pause
  clearInterval(this.intervalId);
  this.intervalId = null;
  }

}
