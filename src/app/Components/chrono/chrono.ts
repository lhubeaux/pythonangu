import { Component, computed, OnDestroy, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-chrono',
  imports: [ButtonModule],
  templateUrl: './chrono.html',
  styleUrl: './chrono.css',
})
export class Chrono implements OnDestroy{

  totalSeconds = signal(3595);
  intervalId?: ReturnType<typeof setInterval>;

  isRunning = signal(false);

  hours = computed(() => Math.floor(this.totalSeconds()/3600));
  minutes = computed(() => Math.floor(this.totalSeconds() % 3600/60));
  seconds = computed(() => this.totalSeconds()%60);

  showMinutes = computed(() => this.totalSeconds () >= 60);
  showHours = computed(() => this.totalSeconds () >= 3600);

  secondDisplay = computed(() => this.showMinutes() ? String(this.seconds()).padStart(2, '0') : String(this.seconds()));
  minutesDisplay = computed(() => this.showHours() ? String(this.minutes()).padStart(2, '0') : String(this.minutes()));

  start():void {
    if(this.isRunning()) return;
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      this.totalSeconds.update((v) => v+1);
    }, 1000)
  }

  stop() : void{
    this.isRunning.set(false);
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId = undefined
    }
  }

  reset(): void{
    this.stop();
    this.totalSeconds.set(0);
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
