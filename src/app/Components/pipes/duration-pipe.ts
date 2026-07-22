import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    if (minutes > 0) {
      return `${minutes}:${this.pad(seconds)}`;
    }

    return `${seconds}`;
  }

  private pad(value: number): string {
    return String(value).padStart(2, '0');
  }
}