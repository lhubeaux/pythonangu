import { Component, WritableSignal, signal, computed } from '@angular/core';

@Component({
  selector: 'app-chrono',
  imports: [],
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

  formattedTime = computed(() => {
  const total = this.time();
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
});


}
