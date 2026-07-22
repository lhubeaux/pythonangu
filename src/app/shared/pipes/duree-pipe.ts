import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duree',
})
export class DureePipe implements PipeTransform {

  transform(totalSeconds: number): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const jours = Math.floor(totalSeconds / 86400);
    const heures = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secondes = Math.floor(totalSeconds % 60);

    return `${pad(jours)}:${pad(heures)}:${pad(minutes)}:${pad(secondes)}`;
  }

}
