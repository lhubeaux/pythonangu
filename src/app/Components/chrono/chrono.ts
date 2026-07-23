import { Component, signal, OnDestroy } from '@angular/core';
import { Button } from 'primeng/button';
import { DurationPipe } from "../../pipes/duration-pipe";

@Component({
  selector: 'app-chrono',
  imports: [Button, DurationPipe],
  templateUrl: './chrono.html',
  styleUrl: './chrono.css',
})
export class Chrono implements OnDestroy {
  totalSeconds = signal(3595);
  isRunning = signal(false);

  private intervalId?: ReturnType<typeof setInterval>;

  start(): void {
    if (this.isRunning()) return;
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.totalSeconds.update((v) => v + 1);
    }, 1000);
  }

  stop(): void {
    this.isRunning.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  reset(): void {
    this.stop();
    this.totalSeconds.set(0);
  }

  ngOnDestroy(): void {
    this.stop();
  }
}